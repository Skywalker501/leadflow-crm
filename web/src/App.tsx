import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'

type Customer = {
  id: number
  name: string
  status: string
}

function App() {
  const [customerName, setCustomerName] = useState('')

  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: '星河科技', status: '待联系' },
    { id: 2, name: '远山商贸', status: '跟进中' },
  ])

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setCustomerName(event.target.value)
  }

  function addCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = customerName.trim()

    if (name === '') {
      return
    }

    const newCustomer: Customer = {
      id: Date.now(),
      name: name,
      status: '待联系',
    }

    setCustomers([...customers, newCustomer])
    setCustomerName('')
  }

  function deleteCustomer(id: number) {
    setCustomers((currentCustomers) =>
      currentCustomers.filter((customer) => customer.id !== id)
    )
  }
  return (
    <main>
      <h1>LeadFlow 客户管理</h1>

      <form onSubmit={addCustomer}>
        <label>
          客户名称：
          <input
            value={customerName}
            onChange={handleNameChange}
            placeholder="请输入客户名称"
          />
        </label>

        <button type="submit">新增客户</button>
      </form>

      <h2>客户列表</h2>

      <ul>
        {customers.map((customer) => (
        <li key={customer.id}>
          {customer.name} — {customer.status}

          <button
            type="button"
            onClick={() => deleteCustomer(customer.id)}
          >
            删除
          </button>
        </li>
        ))}
      </ul>
    </main>
  )
}

export default App