import React from 'react'

const Header = ({approvers,quorum}) => {
  return (
    <Header>
<ul>
    <li>
Approvers:{approvers.join(", ")}
    </li>
    <li>
Quorum:{quorum}
    </li>
</ul>


    </Header>
  )
}

export default Header