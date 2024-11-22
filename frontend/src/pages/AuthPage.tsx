import LoginForm from "@/components/shared/LoginForm";

import Container from "@/components/ui/container";

export function AuthPage() {
  return (
    <Container className="flex items-center justify-center h-screen">
      <LoginForm />
    </Container>
  );
}
