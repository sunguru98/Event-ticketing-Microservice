import Link from "next/link";

export default ({ user }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link href="/">
        <a className="navbar-brand">Event Ticket</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {!user ? (
            <>
              <li className="nav-item">
                <Link href="/auth/signup">
                  <a className="nav-link">Signup</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/auth/signin">
                  <a className="nav-link">Signin</a>
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link href="/auth/signout">
                <a className="nav-link">Signout</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);
