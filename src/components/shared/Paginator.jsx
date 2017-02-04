import React, { Component, PropTypes } from 'react'

import './Paginator.scss'

const PageButton = ({ page, onClickPage, activePage }) => (
  <button
    onClick={() => onClickPage(page)}
    className={(page === activePage) ? 'active' : ''}
  >
    {page}
  </button>
)

PageButton.propTypes = {
  page: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onClickPage: PropTypes.func.isRequired,
}

class Paginator extends Component {
  renderButtons = () => {
    const { totalPages, activePage, onPage } = this.props

    const buttons = []

    for (let i = 1; i <= totalPages; i += 1) {
      buttons.push(<PageButton key={i} page={i} onClickPage={onPage} activePage={activePage} />)
    }

    return buttons
  }

  render() {
    const { totalPages, activePage, onBack, onFoward, onPage } = this.props

    return (
      <div className="paginator">
        <button
          className="paginator-start"
          onClick={() => onPage(1)} disabled={activePage <= 1}
        >
          <i className="fa fa-angle-double-left fa-lg" />
        </button>
        <button
          className="paginator-back"
          onClick={onBack} disabled={activePage <= 1}
        >
          <i className="fa fa-angle-left fa-lg" />
        </button>

        {this.renderButtons()}

        <button
          className="paginator-foward"
          onClick={onFoward} disabled={activePage >= totalPages}
        >
          <i className="fa fa-angle-right fa-lg" />
        </button>
        <button
          className="paginator-end"
          onClick={() => onPage(totalPages)} disabled={activePage >= totalPages}
        >
          <i className="fa fa-angle-double-right fa-lg" />
        </button>
      </div>
    )
  }
}

Paginator.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  onFoward: PropTypes.func.isRequired,
  onPage: PropTypes.func.isRequired,
}

export default Paginator
