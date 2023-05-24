import { useRecoilState } from "recoil"
import { userState } from "../atoms"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "semantic-ui-react"
import "./navbar.css"

function NavBar({updateUser}) {
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate()
    const [user, setUser] = useRecoilState(userState)

    const handleLogout = () => {
        fetch("/logout", {method: "DELETE"})
        .then(res => {
            if (res.ok) {
                updateUser(null)
                navigate("/signup")
            }
        })
    }

    const handleLogin = () => {
        navigate("/login")
    }

    const LoginLogoutButton = () => {
        return user ? (
            <Button icon='log out' labelPosition="left" onClick={handleLogout} content="Log Out" />
        ) : (
            <Button icon='sign in' labelPosition="left" onClick={handleLogin} content="Sign In" />
        );
    };

    return (
        <nav className="navigation">
            {user ? (
                <Button.Group widths='4'>
                    <Button as={Link} to="/" icon="th list" labelPosition="left" content="Workouts" />
                    <Button as={Link} to="/exercise-library" icon="book" labelPosition="left" content="Exercise Library" />
                    <Button as={Link} to="/analytics" icon="chart line" labelPosition="left" content="Analytics" />
                    <LoginLogoutButton />
                </Button.Group>
            ) : (
                <Button.Group fluid>
                    <LoginLogoutButton />
                </Button.Group>
            )}
        </nav>
    )
}
export default NavBar