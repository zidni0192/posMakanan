import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }
    componentDidMount = () => {
        if (localStorage.fullname) {
            window.location.href = '/'
        }
    }
    login = async (e) => {
        e.preventDefault()
        if (this.state.loading) {
            this.state.loading = false
            if (document.getElementById('username').value === 'admin' && document.getElementById('password').value === 'admin') {
                alert('Login Sukses')
                localStorage.setItem('username', 'admin')
                localStorage.setItem('fullname', 'Admin')
                window.location.href='/'
            } else {
                alert('Username Atau Password Salah')
            }
        }
    }
    render() {
        return (
            <div>
                <div style={{ marginBottom: 100, borderRadius: 5, width: 500, marginLeft: "50%", transform: "translateX(-50%)", overflow: "hidden", boxShadow: "0.5px 0.5px 2px #ddd", paddingBottom: 20 }}>
                    <div style={{ padding: "10px 40px", width: "100%", boxSizing: "border-box", boxShadow: "0.5px 0.5px 2px #ddd" }}>
                        <h2>Login</h2>
                    </div>
                    <div style={{ padding: "10px 40px", width: "100%", overflow: "hidden", boxSizing: "border-box", boxShadow: "0px 0px 0.1px #ddd" }}>
                        <form onSubmit={this.login}>
                            <div>
                                <p>Username</p>
                                <input autocomplete="off" type={'username'} style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }} id={'username'} required />
                            </div>
                            <div>
                                <p>Password</p>
                                <input type={'password'} style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }} id={'password'} required />
                            </div>
                            <div>
                                <p></p>
                                <button id={'login'} style={{ padding: 15, width: "100%", borderRadius: '5px', border: "0px", backgroundColor: "#24f555", color: "white", fontSize: "15pt", cursor: "pointer" }}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps)(login)