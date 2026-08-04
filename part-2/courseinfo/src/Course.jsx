const Course = ({ course }) => {

  return (
     <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ course }) => {
  return (
    <div>
      <Part
        part={course.parts[0].name}
        exercises={course.parts[0].exercises}
      />
      <Part
        part={course.parts[1].name}
        exercises={course.parts[1].exercises}
      />
      <Part
        part={course.parts[2].name}
        exercises={course.parts[2].exercises}
      />
      <Part
        part={course.parts[3].name}
        exercises={course.parts[3].exercises}
      />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p style={{ fontWeight: 'bold' }}>Total of { totalExercises } exercises</p>
  )
}

export default Course
