// emailTemplate.ts
export default function EmailTemplateForSpecificUser({
  username,
  message,
}: {
  username: string;
  message: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hello, ${username} 👋</h2>
      <p>${message}</p>
      <hr />
      <small>Powered by Your NavYantra 🚀</small>
    </div>
  `;
}
