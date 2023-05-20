import React from 'react'

const Button = ({ name, command=null, value}) => {
  return (
    <div>
      <button onClick={command} id="button-posi" type="button" className="btn cube cube-hover">
        <div className="bg-top">
          <div className="bg-inner"></div>
        </div>
        <div className="bg-right">
          <div className="bg-inner"></div>
        </div>
        <div className="bg">
          <div className="bg-inner"></div>
        </div>
        <div className="text">{name}</div>
      </button>
    </div>
  )
}

export default Button
