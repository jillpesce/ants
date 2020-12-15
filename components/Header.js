export default function Header(props) {
  return (
    <div className="header">
      <h1>ANTS</h1>
      <div className="header-right">
        <a href="/">Home</a>
        <a href="/profile">Profile</a>
        <a href="/update">Update</a>
        <a href="/feed">Feed</a>
        <a href="/resources">Resources</a>
        <a href="/about">About</a>
      </div>
    </div>
  )
}
