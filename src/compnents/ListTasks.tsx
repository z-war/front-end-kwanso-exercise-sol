import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { Button, Grid, makeStyles, Tooltip } from '@material-ui/core'
import SingleTask from './SingleTask'
const ListTasksStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    paddingTop: '2%',
  },
  mainGrid: {
    display: 'flex',
    flexDirection: 'row',
  },
  createButtonGrid: {
    display: 'flex',

    flexDirection: 'row',
    justifyContent: 'center',
  },
  listGrid: {
    display: 'flex',

    flexDirection: 'column',
    alignItems: 'center',
  },
  bulkDeleteButton: {
    display: 'flex',

    flexDirection: 'row',
    justifyContent: 'center',
  },
}))

interface ITask {
  id: string
  name: string
}

const ListTasks: React.FC = () => {
  const classes = ListTasksStyles()
  const [tasks, setTasks] = React.useState<ITask[]>([])
  const [checkedTasksIdArray, setCheckedTasksIdArray] = React.useState<
    string[]
  >([''])
  React.useEffect(() => {
    fetchTasks()
  }, [])
  React.useEffect(() => {
    console.log('Checked elements array ', checkedTasksIdArray)
  }, [checkedTasksIdArray])

  const deleteTasks = () => {
    const taskArray: any = localStorage?.getItem('tasks')
    const t: ITask[] = JSON.parse(taskArray)
    if (t?.length !== 0 && checkedTasksIdArray?.length !== 0) {
      const convertedArrayToSet = new Set(checkedTasksIdArray)
      console.log('Our Set =>', convertedArrayToSet)
      let newUpdatedArray: ITask[] = t.filter(
        (task) => !convertedArrayToSet.has(task.id)
      )

      localStorage?.setItem('tasks', JSON.stringify(newUpdatedArray))
      fetchTasks()
    } else {
      console.log('No tasks or checked Array')
    }
  }

  const fetchTasks = () => {
    const taskArray: any = localStorage?.getItem('tasks')
    const t: ITask[] = JSON.parse(taskArray)
    if (t?.length !== 0) {
      setTasks(t)
    }
  }
  return (
    <Container className={classes.root}>
      <Grid className={classes.mainGrid}>
        <Grid xs={3} className={classes.createButtonGrid}>
          <Link to='/create-task'>
            <Tooltip title='Add new task'>
              <Button variant='contained' size='medium' color='primary'>
                New task
              </Button>
            </Tooltip>
          </Link>
        </Grid>
        <Grid xs={6} className={classes.listGrid}>
          <Typography variant='h4' component='h1' gutterBottom>
            ListTasks
          </Typography>
          {tasks
            ? tasks.map((singleTask: ITask, key) => {
                return (
                  <SingleTask
                    key
                    id={singleTask.id}
                    name={singleTask.name}
                    setCheckedTasksIdArray={setCheckedTasksIdArray}
                  />
                )
              })
            : 'No Tasks Found'}
        </Grid>
        <Grid xs={3} className={classes.bulkDeleteButton}>
          <Link to='/'>
            <Tooltip title='delete selected tasks'>
              <Button
                variant='contained'
                size='medium'
                color='primary'
                onClick={deleteTasks}
              >
                Delete
              </Button>
            </Tooltip>
          </Link>{' '}
        </Grid>
      </Grid>
    </Container>
  )
}

export default ListTasks
