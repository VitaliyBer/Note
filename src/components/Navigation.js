import React, {Component} from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import Home from './Home';

const history = createBrowserHistory();

const HomeNote = () => (
    <div>
        <Home/>
    </div>
)
const CreateNote = () => (
    <div>
        <App/>
    </div>
)

export default class Navigation extends Component {
    render() {
        return (
            <BrowserRouter history={history}>

                <div className="container ">
                    <div className="row mb-5">
                        <div className="col-8">
                            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item active">
                                            <Link className=" nav-link" to="/">Главная</Link>
                                        </li>
                                        <li className="nav-item"><Link className="nav-link" to="Create">Create
                                            Note</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>

                        </div>
                    </div>

                    <Route exact path="/" component={HomeNote}/>
                    <Route exact path="/Create" component={CreateNote}/>


                </div>

            </BrowserRouter>
        )
    }
}
