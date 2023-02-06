import { useEffect, useState } from 'react'
import * as wn from 'webnative'

export function useAuth() {
  const [program, setState] = useState(null)

  const appInfo =  { creator: 'fission', name: 'react-todomvc' };
  let fs;

  const requestCapabilities = () => {
    if (program) {
      program.capabilities.request()
    }
  }

  useEffect(() => {
    async function getState() {
      const program = await wn.program({
        debug: true,
        namespace: appInfo,
        permissions: {
          app: appInfo
        },
      })
      setState(program ?? null)
    }

    getState()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (program?.session) {
    fs = program.session.fs;
  }

  return { fs, program, requestCapabilities }
}
