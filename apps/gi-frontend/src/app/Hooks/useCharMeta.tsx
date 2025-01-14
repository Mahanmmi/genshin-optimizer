import type { CharacterKey } from '@genshin-optimizer/consts'
import { useContext, useEffect, useState } from 'react'
import { DatabaseContext } from '../Database/Database'

export default function useCharMeta(key: CharacterKey) {
  const { database } = useContext(DatabaseContext)
  const [charMeta, setCharMetaState] = useState(() =>
    database.charMeta.get(key)
  )
  useEffect(
    () =>
      database.charMeta.follow(key, (k, r, dbMeta) => setCharMetaState(dbMeta)),
    [key, database]
  )
  useEffect(() => setCharMetaState(database.charMeta.get(key)), [database, key])
  return charMeta
}
