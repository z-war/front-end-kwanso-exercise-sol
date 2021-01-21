import React, { ReactElement } from 'react'
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Checkbox,
} from '@material-ui/core'
interface Props {
  id: string
  name: string
  setCheckedTasksIdArray: Function
}
const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    margin: '10px',
  },

  title: {
    marginTop: 5,
    fontSize: 18,
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
export default function SingleTask({
  id,
  name,
  setCheckedTasksIdArray,
}: Props): ReactElement {
  const classes = useStyles()
  const [checked, setChecked] = React.useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedTasksIdArray((prev: string[]) => {
        let isIdAlreadyExists = false
        prev.map((prevId) => {
          if (prevId === id) {
            console.log('Id Already Exists')
            isIdAlreadyExists = true
          }
        })
        if (!isIdAlreadyExists) {
          prev.push(id)
          console.log('Id pushed to array', id, prev)

          return prev
        } else {
          return prev
        }
      })
    } else {
      setCheckedTasksIdArray((prev: string[]) => {
        let isIdAlreadyExists = false
        prev.map((prevId) => {
          if (prevId === id) {
            console.log('Id Already Exists')
            isIdAlreadyExists = true
          }
        })
        if (!isIdAlreadyExists) {
          return prev
        } else {
          const index = prev.indexOf(id)
          // console.log('Index to slice from  ', index)
          if (index > -1) {
            // console.log('Array befor splice => ', prev)
            prev.splice(index, 1)
            // console.log('Array after splice =>', prev)
            return prev
          }
        }
      })
    }
    setChecked(event.target.checked)
  }
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {name}
        </Typography>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </CardContent>
    </Card>
  )
}
