export function getInitials(fullName: string) {
  if (!fullName) return;
  const nameParts = fullName.split(" ");

  // If the name consists of only one part, return the first initial
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }

  // Get the first initial and the last initial
  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

  // Return the combined initials
  return firstInitial + lastInitial;
}
