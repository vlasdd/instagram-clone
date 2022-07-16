import React from 'react'

interface ISettingsLinkProps {
  line: string;
  link: string;
}

const SettingsLink: React.FC<ISettingsLinkProps> = React.memo(({ line, link }) => {
  return (
    <div>SettingsLink</div>
  )
})

export default SettingsLink