import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllMenus, postMenu } from '../publics/redux/actions/menu';
import { getAllCategory } from '../publics/redux/actions/category';
import ReactToPrint from 'react-to-print';
import { postTransaksi } from '../publics/redux/actions/transaksi';
import { Link } from 'react-router-dom'
import { postMail } from '../publics/redux/actions/sendMail';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      modalAdd: false,
      modalCheckout: false,
      cartDetail: [],
      total: 0,
      menu: [],
      category: [],
      fullname: localStorage.fullname || 'Bambang',
      noReceipt: '',
      modalEmail: false,
      pajak: 0
    }
  }
  clicked = (param) => {
    let index = this.state.cart.indexOf(param)
    if (index === -1) {
      console.log(this.state.total);
      this.state.total = this.state.total + Number(param.price)
      console.log(this.state.total);
      this.state.cartDetail.push({ jumlah: 1 })
      this.state.cart.push(param)
    } else {
      this.state.total = this.state.total - Number(this.state.cart[index].price) * Number(this.state.cartDetail[index].jumlah)
      this.state.cart.splice(index, 1)
      this.state.cartDetail.splice(index, 1)
    }
    this.setState({ cart: this.state.cart })
    console.log(param, index, this.state);
  }
  componentDidMount = async () => {
    if (!localStorage.fullname) {
      window.location.href = '/login'
    }
    await this.props.dispatch(getAllMenus())
    await this.props.dispatch(getAllCategory())
    this.setState({
      menu: this.props.menu,
      category: this.props.category
    })
    console.log(this.state.category);

  }
  tambah = (index) => {
    this.state.cartDetail[index].jumlah++
    this.state.total = this.state.total + this.state.cart[index].price
    this.setState({ cartDetail: this.state.cartDetail })
  }
  kurang = (index) => {
    if (
      !(this.state.cartDetail[index].jumlah <= 1)
    ) {
      this.state.cartDetail[index].jumlah--
      this.state.total = this.state.total - this.state.cart[index].price
      this.setState({ cartDetail: this.state.cartDetail })
    }
  }
  add = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('name', document.getElementById('name').value)
    formdata.append('image', document.getElementById('image').files[0])
    formdata.append('price', document.getElementById('price').value)
    formdata.append('categoryId', document.getElementById('category').value)
    await this.props.dispatch(postMenu(formdata))
    console.log(document.getElementById('image').files[0])
    this.clear()
    this.setState({ modalAdd: false })
  }
  clear = () => {
    document.getElementById('name').value = ""
    document.getElementById('image').value = ""
    document.getElementById('price').value = ""
  }
  checkout = async () => {
    const date = new Date()
    await this.setState({ modalCheckout: true, noReceipt: 'TRS-' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds(), pajak: this.state.total * (10 / 100) })
    await this.setState({ total: this.state.total + this.state.pajak })
    await this.props.dispatch(postTransaksi(this.state.noReceipt, this.state.total, this.state.cart, this.state.cartDetail))
  }
  sendMail = async () => {
    console.log(this.componentRef)
    await this.props.dispatch(postMail( document.getElementById('email').value))
    alert('Sukses')
    this.setState({ modalEmail: false,cart:[] })
  }
  logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }
  render() {
    return (
      <div>
        <div className={'modalEmail'} style={{ display: [this.state.modalEmail ? 'block' : 'none'] }}>
          <div className={'modalContainer'} >
            <div className={'modalHeader'}>
              <p className={'modalTitle'}>Input Your Email</p>
              <p className={'btnClose'} onClick={() => this.setState({ modalEmail: false })}>X</p>
            </div>
            <div className={'modalBody'}>
              <form onSubmit={this.add} encType={'multipart/form-data'} id={'form'}>
                <div className="inputGroup">
                  <div className="label">
                    <p>Email</p>
                  </div>
                  <div className="input">
                    <input type="text" placeholder="email ..." id={'email'} name="email" required />
                  </div>
                </div>
              </form>
            </div>
            <div className={'modalFooter'}>
              <div>
                <button className="btnSendEmail" onClick={this.sendMail}>Send Email</button>
              </div>
            </div>
          </div>
        </div>
        <div className={'modalCheckout'} style={{ display: [this.state.modalCheckout ? 'block' : 'none'] }}>
          <div className={'modalContainer'} >
            <div ref={el => (this.componentRef = el)}>
              <div className={'modalHeader'}>
                <p className={'modalTitle'}>Checkout</p>
                <p className={'btnClose'} onClick={() => this.setState({ modalCheckout: false })}>X</p>
                <p className={'noReceipt'} >No Receipt : {this.state.noReceipt}</p>
                <p className={'nameUser'}>Cashier : {this.state.fullname}</p>
              </div>
              <div className={'modalBody'}>
                {this.state.cart.map((item) => {
                  let index = this.state.cart.indexOf(item)
                  return (
                    <div className={'wrapItemCart'}>
                      <p className={'nameItem'}>{`${item.name} ${Number(this.state.cartDetail[index].jumlah)}x`}</p>
                      <p className={'totalSementara'}>Rp.{Number(item.price) * Number(this.state.cartDetail[index].jumlah)}</p>
                    </div>
                  )
                })}
                <div className={'wrapItemCart'}>
                  <p className={'nameItem'}>Ppn 10%</p>
                  <p className={'totalSementara'}>Rp. {this.state.pajak}</p>
                </div>
                <div className={'wrapItemCart'}>
                  <p className={'totalSementara'}>Total: Rp. {this.state.total}</p>
                </div>
                <div className={'wrapItemCart'}>
                  <p className={'nameItem'}>Payment : Cash</p>
                </div>
              </div>
            </div>
            <div className={'modalFooter'}>
              <div>
                <ReactToPrint
                  trigger={() => <div className="btnPrint">Print</div>}
                  content={() => this.componentRef}
                  onAfterPrint={()=>this.setState({cart:[]})}
                />
                <p className={'or'}>Or</p>
                <div className="btnSendEmail" onClick={() => this.setState({ modalEmail: true, modalCheckout: false })}>Send Email</div>
              </div>
            </div>
          </div>
        </div>
        <div className={'modalAdd'} style={{ display: [this.state.modalAdd ? 'block' : 'none'] }}>
          <div className={'modalContainer'}>
            <div className={'modalHeader'}>
              <p className={'modalTitle'}>Add Item</p>
              <p className={'btnClose'} onClick={() => this.setState({ modalAdd: false })}>X</p>
            </div>
            <div className={'modalBody'}>
              <form onSubmit={this.add} encType={'multipart/form-data'} id={'form'}>
                <div className="inputGroup">
                  <div className="label">
                    <p>Name</p>
                  </div>
                  <div className="input">
                    <input type="text" placeholder="Name ..." id={'name'} name="name" required />
                  </div>
                </div>
                <div className="inputGroup">
                  <div className="label">
                    <p>Image</p>
                  </div>
                  <div className="input">
                    <input type="file" id={'image'} name="image" accept="image/x-png,image/gif,image/jpeg" required />
                  </div>
                </div>
                <div className="inputGroup">
                  <div className="label">
                    <p>Price</p>
                  </div>
                  <div className="input">
                    <input type="text" placeholder="Price ..." id={'price'} name="price" required />
                  </div>
                </div>
                <div className="inputGroup">
                  <div className="label">
                    <p>Category</p>
                  </div>
                  <div className="input">
                    <select id={'category'} name="category" required>
                      {!this.state.category ? "" : this.state.category.categoryList && this.state.category.categoryList.map((item, index) => {
                        return (
                          <option value={item.idCategory}>{item.name}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className={'modalFooter'}>
                  <div>
                    <button className="btnAdd">Save</button>
                    <button className="btnModalCancel" onClick={() => { this.setState({ modalAdd: false }); this.clear() }}>Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={'utama'}>
          <div className={'header'}>
            <div className={'wrapHeader'}>
              <div className={'menu'}>
                <img src={require('../assets/images/menu-burger.png')} alt={'menu'} />
              </div>
              <div className={'title'}>
                Food Items
              </div>
              <div className={'search'}>
                <img src={require('../assets/images/search.png')} alt={'menu'} />
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
            <div className={'menu'} onClick={() => this.setState({ modalAdd: true })}>
              <img src={require('../assets/images/add.png')} alt={'add'} />
            </div>
            <div className={'menu'}>
              <img src={require('../assets/images/window-back-button.png')} alt={'logout'} onClick={this.logout} />
            </div>
          </div>
          <div className={'wrapListItem'}>
            {this.state.menu.menuList && this.state.menu.menuList.map((item) => {
              return (
                <div className={'item'} onClick={() => this.clicked(item)}>
                  {this.state.cart.indexOf(item) !== -1
                    ?
                    <div className={'wrapClicked'}>
                      <img draggable={'false'} src={item.image} style={{ filter: 'grayscale(80%)' }} />
                      <img draggable={'false'} src={require('../assets/images/centang.png')} className={'centang'} />
                    </div>
                    :
                    <div className={'wrapClicked'}>
                      <img draggable={'false'} src={item.image} />
                    </div>
                  }
                  <p className={'name'}>{item.name}</p>
                  <p className={'price'}>Rp. {item.price}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className={'cart'}>
          <div className={'header'}>
            <div className={'titleCart'}>
              Cart
              <span className={'cartCount'}>
                {this.state.cart.length}
              </span>
            </div>
          </div>
          <div className={'listCart'}>
            {
              this.state.cart.length > 0 ?
                <>
                  <div className={'itemCart'}>
                    {
                      this.state.cart.map((item => {
                        let index = this.state.cart.indexOf(item)
                        return (
                          <div className={'itemWrap'}>
                            <div className={'itemImage'}>
                              <img draggable={'false'} src={this.state.cart[index].image} />
                            </div>
                            <div className={'itemDetail'}>
                              <div className={'wrapItemName'}>
                                <p className={'itemName'}>
                                  {this.state.cart[index].name}
                                </p>
                              </div>
                              <div className={'wrapBtnHarga'}>
                                <div className={'wrapBtnOperasi'}>
                                  <div className={'btnOperasi'} onClick={() => this.kurang(index)}>-</div>
                                  <div className={'countItem'}>{this.state.cartDetail[index].jumlah}</div>
                                  <div className={'btnOperasi'} onClick={() => this.tambah(index)}>+</div>
                                </div>
                                <div className={'harga'}>
                                  Rp.{this.state.cart[index].price}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }))
                    }
                  </div>
                  <div className={'bottomCart'}>
                    <div>
                      <p className={'total'}>
                        Total :
                              </p>
                      <p className={'totalUang'}>
                        Rp.{this.state.total}
                      </p>
                    </div>
                    <p className={'belum'}>
                      *Belum termasuk ppn
                            </p>
                    <div className={'btnCheckout'} onClick={this.checkout}>
                      Checkout
                            </div>
                    <div className={'btnCancel'} onClick={() => this.setState({ cart: [] })}>
                      Cancel
                            </div>
                  </div>
                </>
                :
                <div className={'cartEmpty'}>
                  <img src={require('../assets/images/cartnull.png')} className={'imgEmpty'} />
                  <p className={'your'}>
                    Your cart is empty
                  </p>
                  <p className={'please'}>
                    Please add some items from the menu
                  </p>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    menu: state.menu,
    category: state.category,
    transaksi: state.transaksi
  }
}
export default connect(mapStateToProps)(App);
