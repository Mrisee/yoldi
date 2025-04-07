import Link from 'next/link'

export default function Login() {
  return (
    <div>
      login page
      <footer>
        <div>
          <span>Еще нет аккаунта?</span>
          <Link href='/signup'> Зарегистрироваться</Link>
        </div>
      </footer>
    </div>
  )
}
