import capitalize from 'capitalize';

export function getUserNameOrEmailPrefix(user) {
  if (!user || !(user instanceof Object)) {
    return null;
  }
  const fullName = [user.firstName, user.lastName]
    .join(' ')
    .trim();

  return capitalize.words(
    fullName === '' ? user.email.split('@')[0] : fullName,
  );
}
