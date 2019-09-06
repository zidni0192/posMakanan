import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllTransaksi } from '../publics/redux/actions/transaksi';
import { Link } from 'react-router-dom'
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: []
        }
    }
    componentDidMount = async () => {
        if (!localStorage.fullname) {
            window.location.href = '/login'
        }
        await this.props.dispatch(getAllTransaksi(document.getElementById('by').value))
        this.setState({ history: this.props.transaksi })
    }
    getBy = async () => {
        console.log(document.getElementById('by').value);
        await this.props.dispatch(getAllTransaksi(document.getElementById('by').value))
        this.setState({ history: this.props.transaksi })
    }
    convert = (date) => {
        let data = Date.parse(date)
        let newDate = new Date(data)
        let day = newDate.getDate()
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let month = months[newDate.getMonth()]
        var year = newDate.getFullYear();
        return `${day} ${month} ${year}`
    }
    logout = () => {
        localStorage.clear()
        window.location.href = '/'
    }
    render() {
        return (
            <div className={'history'}>
                <div className={'header'}>
                    <div className={'wrapHeader'}>
                        <div className={'menu'}>
                            <img src={require('../assets/images/menu-burger.png')} alt={'menu'} />
                        </div>
                        <div className={'title'}>
                            History
                        </div>
                    </div>
                </div>
                <div className={'listMenu'}>
                    <div className={'menu'}>
                        <Link to='/'><img src={require('../assets/images/garpu.png')} alt={'makanan'} />
                        </Link>
                    </div>
                    <div className={'menu'}>
                        <Link to='/history'><img src={require('../assets/images/clipboard.png')} alt={'history'} /></Link>
                    </div>
                    <div className={'menu'}>
                        <img src={require('../assets/images/window-back-button.png')} alt={'logout'} onClick={this.logout} />
                    </div>
                </div>
                <div className={'wrapHistory'}>
                    <div>
                        <select onChange={this.getBy} id={'by'}>
                            <option value={''}>All</option>
                            <option value={'today'}>Day</option>
                            <option value={'week'}>Week</option>
                            <option value={'month'}>Month</option>
                            <option value={'year'}>Year</option>
                        </select>
                    </div>
                    <div>
                        <table width='100%'>
                            <tr>
                                <th>ID Transaksi</th>
                                <th>Nama Makanan</th>
                                <th>Jumlah Beli</th>
                                <th>Harga</th>
                                <th>Total</th>
                                <th>Tanggal Beli</th>
                            </tr>
                            {this.state.history.transaksiList && this.state.history.transaksiList.map((item) => {
                                return (
                                    <tr>
                                        <td align={'center'}>{item.idTransaksi}</td>
                                        <td align={'center'}>{item.name}</td>
                                        <td align={'center'}>{item.jumlah}</td>
                                        <td align={'center'}>{item.price}</td>
                                        <td align={'center'}>{Number(item.price) * Number(item.jumlah)}</td>
                                        <td align={'center'}>{this.convert(item.tanggalBeli)}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        transaksi: state.transaksi
    }
}
export default connect(mapStateToProps)(App);
