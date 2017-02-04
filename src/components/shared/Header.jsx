import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'

import './Header.scss'
import logo from '../../images/mmartan.png'

@observer
class Header extends Component {
  clearSearch = () => {
    this.props.productsStore.setSearch('')
  }

  updateSearch = (event) => {
    const search = event.target.value
    this.props.productsStore.setSearch(search)
  }

  renderClearButton = () => {
    const { search } = this.props.productsStore

    if (!search) {
      return false
    }

    return (
      <button onClick={this.clearSearch} className="header-search-clear">
        <i className="fa fa-times-circle" />
      </button>
    )
  }

  render() {
    const { search } = this.props.productsStore

    return (
      <div>
        <div className="header">
          <a href="" className="header-logo">
            <img src={logo} alt="mmartan logo" />
          </a>
          <div className="header-search">
            <i className="fa fa-search header-search-icon" />
            <input
              type="text"
              name="search"
              className="header-search-input"
              placeholder="Buscar"
              onChange={this.updateSearch}
              value={search}
            />
            {this.renderClearButton()}
          </div>
        </div>
        <div className="page-title">
          <span>{search || 'Produtos'}</span>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  productsStore: PropTypes.object.isRequired, // eslint-disable-line
}

export default Header
