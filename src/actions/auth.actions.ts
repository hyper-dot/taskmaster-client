"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { handleUnauthorized } from "@/lib/auth";
import { axiosInstance } from "@/lib/axios";
import axios, { AxiosError } from "axios";
import { TLoginSchema } from "@/schema/auth.schema";

const accessExpires = new Date(Date.now() + 15 * 60 * 1000);
const refreshExpires = new Date(Date.now() + 2 * 60 * 60 * 1000);

// SERVER ACTION FOR LOGGING OUT
export async function logout() {
  cookies().set("token", "", { expires: new Date(0) });
  cookies().set("refresh", "", { expires: new Date(0) });
  redirect("/");
}

// SERVER ACTION FOR GETTING SESSION ON SERVER SIDE
export async function getSession() {
  const accessToken = cookies().get("token")?.value;
  const refreshToken = cookies().get("refresh")?.value;
  return { accessToken, refreshToken };
}

// SERVER ACTION FOR REFRESHING THE TOKEN
export async function refreshToken() {
  try {
    const cookieJar = cookies();
    const refreshToken = cookieJar.get("refresh")?.value;

    if (refreshToken) {
      const { data } = await axiosInstance.post("/auth/refresh", {
        refreshToken,
      });
      cookieJar.set("token", data?.data?.accessToken, {
        expires: accessExpires,
        secure: true,
        httpOnly: true,
      });
    }
    return true;
  } catch (err) {
    console.log("ERROR WHILE REFRESHING TOKEN", err);
  }
}

type TResponse = {
  error?: string;
  message?: string;
  code: number;
};

//SERVER ACTION FOR LOGGING
export const login = async (payload: TLoginSchema): Promise<TResponse> => {
  try {
    const res = await fetch(`http://localhost:8080/auth/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const data = await res.json();
      switch (true) {
        case res.status === 401:
          return {
            error: data.error,
            code: res.status,
          };
        case res.status >= 400 && res.status < 500:
          return {
            error: data.error || "Something went wrong",
            code: res.status,
          };
        case res.status >= 500:
          return {
            error: data.error || "Internal server error",
            code: res.status,
          };
        default:
          return {
            error: data.error || "Something went wrong !!",
            code: res.status,
          };
      }
    } else {
      const data = await res.json();
      cookies().set("token", data?.data?.accessToken, {
        secure: true,
        expires: accessExpires,
        httpOnly: true,
      });
      cookies().set("refresh", data?.data?.refreshToken, {
        secure: true,
        expires: refreshExpires,
        httpOnly: true,
      });
      revalidatePath("/", "layout");
      return {
        code: res.status,
        message: "You have been loggedin successfully !!",
      };
    }
  } catch (err: any) {
    console.log("Error while logging in", err);
    return {
      code: err.code || 500,
      error: err.error || "couldn't connect to server",
    };
  }
};
