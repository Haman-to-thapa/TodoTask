let tasks = []
let idCounter = 1;

 export const createTask = (req,res) => {
  try {
    const {name, description} = req.body;

    if(!name || !description) {
      return res.status(400).json({
        success:false,
        message:"Name and description required"
      })
    }

    const NewTask = {id: idCounter++ , name, description};
    tasks.push(NewTask)
    return res.status(201).json({
      success:true,
      message:"createTask successfully",
      NewTask
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:"false",
      message:"createTask success"
    })
  }
 } 

 export const getAllTasks = (req,res) => {
  res.json(tasks)
 }

 
 export const updatedTask = (req,res) => {
try {
  const {id} = req.params;
  const {name, description} = req.body;
  const task = tasks.find(taskId => taskId.id === parseInt(id));

  if(!task) return res.status(404).json({
    success:false,
    message:"Task not found"
  })

  task.name = name ?? task.name;
  task.description = description ?? task.description;
  return res.status(200).json({
    success:true,
    message:"task updated successfully",
    task
  })

} catch (error) {
  console.log(error)
  return res.status(500).json({
    success:false,
    message:"Server error at deleteTask"
  })
}
 }


 export const deleteTask = (req,res) => {
  try {
    
    const {id} = req.params;
    const index = tasks.findIndex(taskId => taskId.id === parseInt(id));

    if(index === -1) return res.status(404).json({
      success:false,
      message:"Task not found"
    })

    tasks.splice(index, 1);
    return res.status(204).end();

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Server error deleteTask"
    })
  }
 }