import {Link} from 'react-router-dom'

const Footer = () => {

    return (
        <footer>
            <ul>
                <li>
                    <Link to={'privacy-policy'}>Privacy Policy</Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer