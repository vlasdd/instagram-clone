import Header from 'components/header/Header'
import Loading from 'pages/loading/Loading'
import React, { useMemo } from 'react'
import PersonSuggestion from './components/PersonSuggestion'
import useSuggestions from './hooks/useSuggestions'

const People: React.FC = React.memo(() => {
  const suggestions = useSuggestions();

  const users = useMemo(() => suggestions.map(data => (
    <PersonSuggestion
      {...data}
      key={data.userId}
    />
  )), [suggestions])

  return (
    users.length === 0 ?
      <Loading /> :
      <>
        <div className="back flex flex-col items-center">
          <Header />
          <div className={`min-h-[calc(100vh-60px)] w-full max-w-[550px] bg-blue-700 flex flex-col items-center back sm:pt-16 pb-16`}>
            <div className="w-full flex justify-start font-medium h-8 flex items-center bg-white sm:bg-inherit px-4">
              Suggested
            </div>
            <div className="w-full flex flex-col bg-white py-2 px-1">
              {users}
            </div>
          </div>
        </div>
        <div className="flex w-full fixed bottom-3 justify-center back text-xs text-gray-300 font-medium back">
          © 2022 INSTAGRAM FROM META
        </div>
      </>
  )
})

export default People