import Link from "next/link";

export default function Signup() {
  return (
    <div>sign up page
      <footer>
        <div>
          <span>Еще нет аккаунта? </span>
          <Link href="/login">Войти</Link>
        </div>
      </footer>
    </div>
  )
}