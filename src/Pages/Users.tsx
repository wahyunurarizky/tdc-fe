import { useEffect, useState } from 'react'
import Button from '../Components/Button'
import FormNewUser from '../Feature/FormNewUser'
import { deleteUser, getUsers } from '../Services/user'
import { IUser } from '../Types/model'
import FormEditUser from '../Feature/FormEditUser'
import Swal from 'sweetalert2'

const Users = () => {
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [userEdit, setUserEdit] = useState<IUser | null>(null)
  const [users, setUsers] = useState<IUser[]>([])

  const fetchUsers = async () => {
    try {
      const userList = await getUsers()
      setUsers(userList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const reload = () => {
    setShowCreate(false)
    setShowEdit(false)
    fetchUsers()
  }

  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })

      if (result.isConfirmed) {
        await deleteUser(id)
        Swal.fire('Success', 'User deleted successfully', 'success')
        reload()
      }
    } catch (error: unknown) {
      let message = 'unknown error'
      if (error instanceof Error) {
        message = error.message
      }
      Swal.fire(message, '', 'error')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-center font-bold text-lg uppercase">Users</h1>
      <div className="justify-end flex">
        <Button
          onClick={() => {
            setShowCreate(true)
          }}
        >
          + User
        </Button>
      </div>
      <div className="flex justify-center">
        <table className="w-full text-left max-w-[900px]">
          <thead className="bg-red-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td className="flex gap-4">
                  <button
                    className="text-yellow-600 font-bold"
                    onClick={() => {
                      setShowEdit(true)
                      setUserEdit(user)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-800 font-bold"
                    onClick={() => {
                      handleDelete(user.id)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FormNewUser
        isOpen={showCreate}
        onRequestClose={() => {
          setShowCreate(false)
        }}
        reload={reload}
        shouldCloseOnEsc
      />
      {userEdit && (
        <FormEditUser
          isOpen={showEdit}
          user={userEdit}
          onRequestClose={() => {
            setShowEdit(false)
          }}
          reload={reload}
          shouldCloseOnEsc
        />
      )}
    </div>
  )
}

export default Users
