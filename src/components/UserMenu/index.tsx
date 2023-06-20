import React, { HTMLAttributes, useContext } from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { Button } from '../Button'
import { AuthContext } from 'src/context/AuthContext'
import { Dropdown } from '../Dropdown'
import md5 from 'md5'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { useScreenSize } from 'src/hooks/useScreenSize'

export function UserMenu(props: HTMLAttributes<HTMLDivElement>) {
  const isMobile = useScreenSize('mobile')
  const { session, signOut } = useContext(AuthContext)

  if (!session) {
    return (
      <div {...props}>
        <Link to="/sign-up" data-testid="user-menu-sign-up">
          <Button size={isMobile ? 'small' : 'medium'}>Sign up</Button>
        </Link>
      </div>
    )
  }

  const { user } = session

  return (
    <div {...props}>
      <Dropdown.Wrapper>
        <Dropdown.Trigger>
          <Avatar />
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Header>
            <Heading level={3} title={user.name} />
            <Text isMuted size="small">
              {user.email}
            </Text>
          </Dropdown.Header>
          {/* <Dropdown.Item>
            <Link to="/favorites">💜 Favorites</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/settings">⚙️ Preferences</Link>
          </Dropdown.Item> */}
          <Dropdown.Item onClick={signOut}>
            <Link to="#" onClick={signOut}>
              🚪 Sign out
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Wrapper>
    </div>
  )
}

const Avatar = () => {
  const { session } = useContext(AuthContext)

  if (!session) {
    return <></>
  }

  const { user } = session
  const hash = md5(user.email)
  const img = `https://www.gravatar.com/avatar/${hash}?d=mp`

  return (
    <div className={styles.avatar} data-testid="user-menu-avatar">
      <img src={img} />
    </div>
  )
}