import React, { ReactElement } from 'react'

import TextField from '@material-ui/core/TextField'
import { Box, makeStyles, Grid, Button, Container } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { getId } from '../utilities/utils'
const CreateTasksStyles = makeStyles(() => ({
  root: {
    width: '40%',
    paddingTop: '5%',
  },
  _box: {
    padding: '4%',
  },
  mainGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputGrid: {},
  buttonGrid: {
    paddingTop: '2%',
  },
}))

interface Props {}
interface ITask {
  id: string
  name: string
}
export default function CreateTask({}: Props): ReactElement {
  const classes = CreateTasksStyles()
  const history = useHistory()
  const [taskName, setTaskName] = React.useState<string>('')

  const createTask = () => {
    try {
      if (taskName) {
        const taskArray: any = localStorage?.getItem('tasks')
        const taskJSON: ITask[] = JSON.parse(taskArray)
        if (taskJSON && taskJSON?.length !== 0) {
          let id = getId()
          let isNotUniqueId = false
          taskJSON.map((singleTask) => {
            if (singleTask?.id === id) {
              isNotUniqueId = true
            }
          })
          if (isNotUniqueId) {
            let task: ITask = {
              id: getId(),
              name: taskName,
            }
            taskJSON.push(task)
          } else {
            let task: ITask = {
              id,
              name: taskName,
            }

            taskJSON.push(task)
          }

          localStorage.setItem('tasks', JSON.stringify(taskJSON))

          history.push('/list-tasks')
        } else {
          let task: ITask = {
            id: getId(),
            name: taskName,
          }
          let tasksArray: ITask[] = []
          tasksArray.push(task)
          localStorage.setItem('tasks', JSON.stringify(tasksArray))

          history.push('/list-tasks')
        }
      } else {
        console.log('Error validation')
      }
    } catch (error) {
      console.log('Error ', error)
    }
  }
  return (
    <Container className={classes.root}>
      <Box boxShadow={2} className={classes._box}>
        <Grid className={classes.mainGrid}>
          <Grid xs={6} className={classes.inputGrid}>
            <TextField
              required
              id='standard-required'
              label='Task Name'
              onChange={(e) => {
                setTaskName(e.target.value)
              }}
            />
          </Grid>
          <Grid xs={6} className={classes.buttonGrid}>
            <Button
              variant='contained'
              size='medium'
              color='primary'
              onClick={createTask}
            >
              Add task
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
