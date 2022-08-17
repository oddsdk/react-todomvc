import { useEffect, useState } from 'react'
import * as wn from 'webnative'

wn.setup.debug({ enabled: true })

// wn.ipfs.pkgFromBundle()
//   .then(wn.ipfs.nodeWithPkg)
//   .then(wn.ipfs.set)

export function useAuth() {
  const [state, setState] = useState(null)
  let fs;

  const authorise = () => {
    if (state) {
      wn.redirectToLobby(state.permissions)
    }
  }

  useEffect(() => {
    async function getState() {
      const result = await wn.initialise({
        permissions: {
          app: {
            name: 'react-todomvc',
            creator: 'bgins',
          },
        },
      })
      setState(result)
    }

    getState()
  }, [])

  switch (state?.scenario) {
    case wn.Scenario.AuthSucceeded:
    case wn.Scenario.Continuation:
      fs = state.fs;
      break;

    default:
      break;
  }

  return { authorise, fs, state }
}
