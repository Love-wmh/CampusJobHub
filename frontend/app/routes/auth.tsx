import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { Route } from './+types/auth'
import { BriefcaseBusiness, Loader2, LogIn, UserPlus } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

type Role = 'student' | 'company'
type Mode = 'login' | 'register'
type AuthUser = Record<string, string | number | null | undefined>

const API_BASE = 'http://localhost:8080/api'

const defaultForms: Record<Role, AuthUser> = {
  student: {
    username: 'student001',
    password: '123456',
    studentName: '',
    className: '',
    major: '',
    email: '',
    phone: '',
  },
  company: {
    name: '企业管理员',
    password: '123456',
    phone: '',
  },
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: '登录注册 - CampusJobHub' },
    { name: 'description', content: 'CampusJobHub 极简登录注册' },
  ]
}

async function requestJson<T>(path: string, body: AuthUser): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (response.status === 401) {
    throw new Error('AUTH_FAILED')
  }
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json() as Promise<T>
}

export default function AuthPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>('student')
  const [mode, setMode] = useState<Mode>('login')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState<AuthUser>(defaultForms.student)

  function changeRole(nextRole: Role) {
    setRole(nextRole)
    setMessage('')
    setForm(defaultForms[nextRole])
  }

  function changeMode(nextMode: Mode) {
    setMode(nextMode)
    setMessage('')
  }

  function updateField(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function submit() {
    setLoading(true)
    setMessage('')
    try {
      const user =
        role === 'student'
          ? await submitStudent(mode, form)
          : await submitCompanyUser(mode, form)
      if (!user) {
        setMessage('账号或密码错误')
        return
      }
      localStorage.setItem('campusjobhub_user', JSON.stringify({ role, user }))
      navigate('/companies')
    } catch (error) {
      setMessage(error instanceof Error && error.message === 'AUTH_FAILED' ? '账号或密码错误' : '操作失败，请确认后端已启动，并检查填写内容')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 text-neutral-950">
      <section className="w-full max-w-md rounded-sm border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-sm bg-black text-white">
            <BriefcaseBusiness className="size-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">CampusJobHub</h1>
            <p className="text-xs text-neutral-500">高校企业岗位招聘网站</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <Tabs value={mode} onValueChange={(value) => changeMode(value as Mode)}>
            <TabsList className="grid w-full grid-cols-2 bg-neutral-100">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs value={role} onValueChange={(value) => changeRole(value as Role)}>
            <TabsList className="grid w-full grid-cols-2 bg-neutral-100">
              <TabsTrigger value="student">学生</TabsTrigger>
              <TabsTrigger value="company">企业用户</TabsTrigger>
            </TabsList>
          </Tabs>

          {role === 'student' ? (
            <StudentFields mode={mode} form={form} updateField={updateField} />
          ) : (
            <CompanyFields mode={mode} form={form} updateField={updateField} />
          )}

          {message ? <p className="text-sm text-neutral-600">{message}</p> : null}

          <Button className="mt-1 w-full bg-black text-white hover:bg-neutral-700" onClick={submit} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : mode === 'login' ? <LogIn /> : <UserPlus />}
            {mode === 'login' ? '登录' : '注册'}
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate('/companies')}>
            返回首页
          </Button>
        </div>
      </section>
    </main>
  )
}

function StudentFields({
  mode,
  form,
  updateField,
}: {
  mode: Mode
  form: AuthUser
  updateField: (key: string, value: string) => void
}) {
  return (
    <div className="grid gap-3">
      <Field label="用户名" value={String(form.username ?? '')} onChange={(value) => updateField('username', value)} />
      <Field label="密码" value={String(form.password ?? '')} onChange={(value) => updateField('password', value)} type="password" />
      {mode === 'register' ? (
        <>
          <Field label="学生姓名" value={String(form.studentName ?? '')} onChange={(value) => updateField('studentName', value)} />
          <Field label="班级" value={String(form.className ?? '')} onChange={(value) => updateField('className', value)} />
          <Field label="专业" value={String(form.major ?? '')} onChange={(value) => updateField('major', value)} />
          <Field label="邮箱" value={String(form.email ?? '')} onChange={(value) => updateField('email', value)} />
          <Field label="联系电话" value={String(form.phone ?? '')} onChange={(value) => updateField('phone', value)} />
        </>
      ) : null}
    </div>
  )
}

function CompanyFields({
  mode,
  form,
  updateField,
}: {
  mode: Mode
  form: AuthUser
  updateField: (key: string, value: string) => void
}) {
  return (
    <div className="grid gap-3">
      <Field label="姓名" value={String(form.name ?? '')} onChange={(value) => updateField('name', value)} />
      <Field label="密码" value={String(form.password ?? '')} onChange={(value) => updateField('password', value)} type="password" />
      {mode === 'register' ? (
        <Field label="联系电话" value={String(form.phone ?? '')} onChange={(value) => updateField('phone', value)} />
      ) : null}
    </div>
  )
}

function Field({
  label,
  value,
  type = 'text',
  onChange,
}: {
  label: string
  value: string
  type?: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-neutral-700">{label}</Label>
      <Input value={value} type={type} onChange={(event) => onChange(event.target.value)} className="border-neutral-200 bg-white" />
    </div>
  )
}

async function submitStudent(mode: Mode, form: AuthUser) {
  if (mode === 'login') {
    return requestJson<AuthUser | null>('/students/login', {
      username: form.username,
      password: form.password,
    })
  }
  if (!form.username || !form.password) {
    throw new Error('用户名和密码不能为空')
  }
  return requestJson<AuthUser>('/students', {
    username: form.username,
    password: form.password,
    studentName: form.studentName || form.username,
    className: form.className,
    major: form.major,
    email: form.email,
    phone: form.phone,
  })
}

async function submitCompanyUser(mode: Mode, form: AuthUser) {
  if (mode === 'login') {
    return requestJson<AuthUser | null>('/company-users/login', {
      name: form.name,
      password: form.password,
    })
  }
  if (!form.name || !form.password) {
    throw new Error('姓名和密码不能为空')
  }
  return requestJson<AuthUser>('/company-users', {
    name: form.name,
    password: form.password,
    phone: form.phone,
  })
}
