import { Outlet, Link} from "react-router-dom";
const Layout = () =>{
    return <div>
        <nav>
            <ul>
                <li>
                    <link to="/">Home</link>
                </li>
                <li>
                    <link to="/">Registro</link>
                </li>
                <li>
                    <link to="/">Ajustes</link>
                </li>
            </ul>
        </nav>
        <hr />
        <Outlet />
    </div>
}
export default Layout;