import React from 'react'

import './Backdrop.css'

const Backdrop = ({ removeBackdrop }) => (
  <div className="backdrop" onClick={removeBackdrop} />
)

export default Backdrop
