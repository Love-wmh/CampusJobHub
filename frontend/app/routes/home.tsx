import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Route } from './+types/home'
import {
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Loader2,
  LogIn,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  Trash2,
  UserRound,
} from 'lucide-react'

import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Textarea } from '~/components/ui/textarea'

type EntityKey = 'companies' | 'students' | 'jobs' | 'applications' | 'companyUsers'
type FieldType = 'text' | 'number' | 'textarea' | 'image'
type EntityRecord = Record<string, string | number | null | undefined>

type FieldConfig = {
  key: string
  label: string
  type?: FieldType
  placeholder?: string
}

type ColumnConfig = {
  key: string
  label: string
  width?: string
}

type EntityConfig = {
  key: EntityKey
  title: string
  description: string
  endpoint: string
  idKey: string
  icon: typeof Building2
  columns: ColumnConfig[]
  fields: FieldConfig[]
  searchableKeys: string[]
}

const API_BASE = 'http://localhost:8080/api'

const configs: EntityConfig[] = [
  {
    key: 'companies',
    title: '企业信息',
    description: '维护企业名称、性质、城市、简介和展示图片',
    endpoint: '/companies',
    idKey: 'companyId',
    icon: Building2,
    searchableKeys: ['companyName', 'companyCategory', 'companyNature', 'city'],
    columns: [
      { key: 'companyName', label: '企业名称', width: '220px' },
      { key: 'companyCategory', label: '类别' },
      { key: 'companyNature', label: '性质' },
      { key: 'city', label: '城市' },
      { key: 'address', label: '详细地址', width: '260px' },
    ],
    fields: [
      { key: 'companyName', label: '企业名称', placeholder: '例如：星河科技有限公司' },
      { key: 'companyImage', label: '企业图片链接', type: 'image', placeholder: 'https://...' },
      { key: 'companyCategory', label: '企业类别', placeholder: '互联网 / 教育科技' },
      { key: 'companyNature', label: '企业性质', placeholder: '民营企业 / 国有控股' },
      { key: 'city', label: '所在城市', placeholder: '成都' },
      { key: 'address', label: '详细地址', placeholder: '高新区天府软件园A区' },
      { key: 'companyIntro', label: '企业简介', type: 'textarea', placeholder: '简要介绍企业业务方向' },
    ],
  },
  {
    key: 'students',
    title: '学生信息',
    description: '维护学生账号、班级、专业、邮箱和电话',
    endpoint: '/students',
    idKey: 'studentId',
    icon: GraduationCap,
    searchableKeys: ['username', 'studentName', 'className', 'major', 'email', 'phone'],
    columns: [
      { key: 'studentName', label: '学生姓名' },
      { key: 'username', label: '用户名' },
      { key: 'className', label: '班级' },
      { key: 'major', label: '专业', width: '190px' },
      { key: 'phone', label: '联系电话' },
      { key: 'email', label: '邮箱', width: '220px' },
    ],
    fields: [
      { key: 'username', label: '用户名', placeholder: 'student001' },
      { key: 'password', label: '密码', placeholder: '123456' },
      { key: 'studentName', label: '学生姓名', placeholder: '李明' },
      { key: 'className', label: '班级', placeholder: '软件2461' },
      { key: 'major', label: '专业', placeholder: '软件工程' },
      { key: 'email', label: '邮箱', placeholder: 'student@example.com' },
      { key: 'phone', label: '联系电话', placeholder: '13900000001' },
    ],
  },
  {
    key: 'jobs',
    title: '岗位信息',
    description: '维护招聘岗位、人数、能力要求和薪资区间',
    endpoint: '/jobs',
    idKey: 'jobId',
    icon: BriefcaseBusiness,
    searchableKeys: ['jobName', 'jobDescription', 'abilityDescription', 'companyId'],
    columns: [
      { key: 'jobName', label: '岗位名称', width: '190px' },
      { key: 'companyId', label: '企业ID' },
      { key: 'recruitCount', label: '人数' },
      { key: 'salaryMin', label: '薪资起限' },
      { key: 'salaryMax', label: '薪资上限' },
      { key: 'abilityDescription', label: '能力要求', width: '320px' },
    ],
    fields: [
      { key: 'companyId', label: '企业ID', type: 'number', placeholder: '1' },
      { key: 'jobName', label: '岗位名称', placeholder: 'Java 后端实习生' },
      { key: 'jobDescription', label: '岗位描述', type: 'textarea', placeholder: '说明岗位主要工作内容' },
      { key: 'abilityDescription', label: '能力要求', type: 'textarea', placeholder: 'Java / Spring Boot / MySQL' },
      { key: 'recruitCount', label: '招聘人数', type: 'number', placeholder: '5' },
      { key: 'salaryMin', label: '薪资起限', type: 'number', placeholder: '3000' },
      { key: 'salaryMax', label: '薪资上限', type: 'number', placeholder: '6000' },
    ],
  },
  {
    key: 'applications',
    title: '应聘信息',
    description: '基于应聘视图查看学生、岗位和企业关联数据',
    endpoint: '/applications',
    idKey: 'applicationId',
    icon: ClipboardList,
    searchableKeys: ['studentName', 'jobName', 'companyName', 'major', 'resumeUrl'],
    columns: [
      { key: 'studentName', label: '学生' },
      { key: 'jobName', label: '应聘岗位', width: '190px' },
      { key: 'companyName', label: '企业', width: '190px' },
      { key: 'major', label: '专业' },
      { key: 'resumeUrl', label: '简历链接', width: '260px' },
    ],
    fields: [
      { key: 'studentId', label: '学生ID', type: 'number', placeholder: '1' },
      { key: 'jobId', label: '岗位ID', type: 'number', placeholder: '1' },
      { key: 'resumeUrl', label: '简历链接', placeholder: 'https://example.com/resume.pdf' },
    ],
  },
  {
    key: 'companyUsers',
    title: '企业用户',
    description: '维护企业端登录用户，支持简单登录验证',
    endpoint: '/company-users',
    idKey: 'companyUserId',
    icon: UserRound,
    searchableKeys: ['name', 'phone'],
    columns: [
      { key: 'name', label: '姓名' },
      { key: 'phone', label: '联系电话' },
      { key: 'password', label: '密码' },
    ],
    fields: [
      { key: 'name', label: '姓名', placeholder: '企业管理员' },
      { key: 'password', label: '密码', placeholder: '123456' },
      { key: 'phone', label: '联系电话', placeholder: '13800000001' },
    ],
  },
]

const seedData: Record<EntityKey, EntityRecord[]> = {
  companies: [
    {
      companyId: 1,
      companyName: '星河科技有限公司',
      companyImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
      companyCategory: '互联网',
      companyNature: '民营企业',
      companyIntro: '专注校园招聘和企业数字化服务。',
      city: '成都',
      address: '高新区天府软件园A区',
    },
    {
      companyId: 2,
      companyName: '青云教育科技',
      companyImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
      companyCategory: '教育科技',
      companyNature: '股份制企业',
      companyIntro: '为高校提供智慧教学和实习就业平台。',
      city: '重庆',
      address: '渝北区创新经济走廊',
    },
  ],
  students: [
    {
      studentId: 1,
      username: 'student001',
      password: '123456',
      studentName: '李明',
      className: '软件2461',
      major: '软件工程',
      email: 'liming@example.com',
      phone: '13900000001',
    },
    {
      studentId: 2,
      username: 'student002',
      password: '123456',
      studentName: '王晓雨',
      className: '计科2462',
      major: '计算机科学与技术',
      email: 'wangxy@example.com',
      phone: '13900000002',
    },
  ],
  jobs: [
    {
      jobId: 1,
      companyId: 1,
      jobName: 'Java 后端实习生',
      jobDescription: '参与高校招聘平台后端接口开发。',
      abilityDescription: '熟悉 Java、Spring Boot、MySQL。',
      recruitCount: 5,
      salaryMin: 3000,
      salaryMax: 6000,
    },
    {
      jobId: 2,
      companyId: 1,
      jobName: '前端开发实习生',
      jobDescription: '负责管理后台页面与接口联调。',
      abilityDescription: '熟悉 React、TypeScript、基础 UI 组件。',
      recruitCount: 3,
      salaryMin: 2800,
      salaryMax: 5500,
    },
  ],
  applications: [
    {
      applicationId: 1,
      studentId: 1,
      studentName: '李明',
      jobId: 1,
      jobName: 'Java 后端实习生',
      companyId: 1,
      companyName: '星河科技有限公司',
      major: '软件工程',
      resumeUrl: 'https://example.com/resumes/liming.pdf',
    },
  ],
  companyUsers: [
    { companyUserId: 1, name: '企业管理员', password: '123456', phone: '13800000001' },
  ],
}

const numericFields = new Set(['companyId', 'studentId', 'jobId', 'applicationId', 'companyUserId', 'recruitCount', 'salaryMin', 'salaryMax'])

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'CampusJobHub 高校企业岗位招聘网站' },
    { name: 'description', content: '高校企业岗位招聘网站数据库课程作业' },
  ]
}

function createBlankRecord(config: EntityConfig): EntityRecord {
  return config.fields.reduce<EntityRecord>((record, field) => {
    record[field.key] = field.type === 'number' ? 0 : ''
    return record
  }, {})
}

function displayValue(value: EntityRecord[string]) {
  if (value === null || value === undefined || value === '') {
    return '未填写'
  }
  return String(value)
}

async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json() as Promise<T>
}

export default function Home() {
  const [activeKey, setActiveKey] = useState<EntityKey>('companies')
  const [data, setData] = useState<Record<EntityKey, EntityRecord[]>>(seedData)
  const [forms, setForms] = useState<Record<EntityKey, EntityRecord>>(() => {
    return configs.reduce<Record<EntityKey, EntityRecord>>((result, config) => {
      result[config.key] = createBlankRecord(config)
      return result
    }, {} as Record<EntityKey, EntityRecord>)
  })
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState('后端未启动时会展示内置示例数据')

  const activeConfig = configs.find((config) => config.key === activeKey) ?? configs[0]
  const activeRows = data[activeKey]

  const filteredRows = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    if (!keyword) return activeRows
    return activeRows.filter((row) =>
      activeConfig.searchableKeys.some((key) => displayValue(row[key]).toLowerCase().includes(keyword)),
    )
  }, [activeConfig, activeRows, search])

  const stats = useMemo(
    () => [
      { label: '企业数量', value: data.companies.length, icon: Building2 },
      { label: '学生数量', value: data.students.length, icon: GraduationCap },
      { label: '岗位数量', value: data.jobs.length, icon: BriefcaseBusiness },
      { label: '应聘记录', value: data.applications.length, icon: ClipboardList },
    ],
    [data],
  )

  async function loadEntity(config: EntityConfig) {
    setLoading(true)
    try {
      const rows = await requestJson<EntityRecord[]>(config.endpoint)
      setData((current) => ({ ...current, [config.key]: rows }))
      setNotice('已连接后端 API，数据来自 MySQL')
    } catch {
      setData((current) => ({ ...current, [config.key]: current[config.key].length ? current[config.key] : seedData[config.key] }))
      setNotice('后端暂不可用，当前显示内置示例数据')
    } finally {
      setLoading(false)
    }
  }

  async function loadAll() {
    await Promise.all(configs.map((config) => loadEntity(config)))
  }

  useEffect(() => {
    void loadAll()
  }, [])

  function updateForm(field: FieldConfig, value: string) {
    const nextValue = field.type === 'number' || numericFields.has(field.key) ? Number(value) : value
    setForms((current) => ({
      ...current,
      [activeKey]: {
        ...current[activeKey],
        [field.key]: nextValue,
      },
    }))
  }

  function resetForm() {
    setForms((current) => ({ ...current, [activeKey]: createBlankRecord(activeConfig) }))
    setEditingId(null)
  }

  function editRow(row: EntityRecord) {
    const nextForm = activeConfig.fields.reduce<EntityRecord>((record, field) => {
      record[field.key] = row[field.key] ?? ''
      return record
    }, {})
    setForms((current) => ({ ...current, [activeKey]: nextForm }))
    setEditingId(row[activeConfig.idKey] ?? null)
  }

  async function saveCurrent() {
    const payload = forms[activeKey]
    const isEditing = editingId !== null && editingId !== undefined
    setLoading(true)
    try {
      if (isEditing) {
        await requestJson<number>(`${activeConfig.endpoint}/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
      } else {
        await requestJson<EntityRecord>(activeConfig.endpoint, {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      }
      await loadEntity(activeConfig)
      resetForm()
      setNotice(isEditing ? '修改成功，数据已同步到 MySQL' : '添加成功，数据已同步到 MySQL')
    } catch {
      const localId = isEditing ? editingId : Date.now()
      const localRow = { ...payload, [activeConfig.idKey]: localId }
      setData((current) => ({
        ...current,
        [activeKey]: isEditing
          ? current[activeKey].map((row) => (row[activeConfig.idKey] === editingId ? localRow : row))
          : [localRow, ...current[activeKey]],
      }))
      resetForm()
      setNotice('后端暂不可用，本次操作只更新了页面示例数据')
    } finally {
      setLoading(false)
    }
  }

  async function deleteRow(row: EntityRecord) {
    const id = row[activeConfig.idKey]
    if (id === null || id === undefined) return
    setLoading(true)
    try {
      await requestJson<number>(`${activeConfig.endpoint}/${id}`, { method: 'DELETE' })
      await loadEntity(activeConfig)
      setNotice('删除成功，数据已同步到 MySQL')
    } catch {
      setData((current) => ({
        ...current,
        [activeKey]: current[activeKey].filter((item) => item[activeConfig.idKey] !== id),
      }))
      setNotice('后端暂不可用，本次删除只更新了页面示例数据')
    } finally {
      setLoading(false)
    }
  }

  async function studentLogin() {
    setLoading(true)
    try {
      const body = { username: 'student001', password: '123456' }
      const user = await requestJson<EntityRecord | null>('/students/login', { method: 'POST', body: JSON.stringify(body) })
      setNotice(user ? `学生登录成功：${user.studentName}` : '学生登录失败')
    } catch {
      setNotice('后端暂不可用，无法执行登录验证')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#fff7f8] text-[#251319]">
      <aside className="fixed inset-y-0 left-0 hidden w-56 border-r border-rose-100 bg-[#fff4f5] px-4 py-5 lg:block">
        <div className="flex items-center gap-2 px-2 text-sm font-semibold">
          <div className="flex size-8 items-center justify-center rounded-lg bg-rose-600 text-white">
            <BriefcaseBusiness className="size-4" />
          </div>
          CampusJobHub
        </div>
        <nav className="mt-8 space-y-6">
          <NavGroup title="管理">
            {configs.slice(0, 4).map((config) => (
              <NavButton key={config.key} active={activeKey === config.key} icon={config.icon} onClick={() => setActiveKey(config.key)}>
                {config.title}
              </NavButton>
            ))}
          </NavGroup>
          <NavGroup title="账号">
            <NavButton active={activeKey === 'companyUsers'} icon={UserRound} onClick={() => setActiveKey('companyUsers')}>
              企业用户
            </NavButton>
            <NavButton active={false} icon={LogIn} onClick={studentLogin}>
              学生登录测试
            </NavButton>
          </NavGroup>
        </nav>
      </aside>

      <section className="lg:pl-56">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-rose-100 bg-[#fff7f8]/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" className="lg:hidden">
              <LayoutDashboard />
            </Button>
            <div>
              <p className="text-sm font-semibold">高校企业岗位招聘网站</p>
              <p className="text-xs text-rose-900/50">24611602009 蒲自旭</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden h-8 items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 text-sm text-rose-950/60 md:flex">
              <Search className="size-4" />
              <span>搜索企业、学生、岗位</span>
              <Badge variant="outline" className="border-rose-200 text-rose-600">
                Ctrl K
              </Badge>
            </div>
            <Button variant="outline" size="icon-sm" onClick={loadAll} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <RefreshCw />}
            </Button>
            <div className="flex size-8 items-center justify-center rounded-full bg-rose-600 text-sm font-semibold text-white">蒲</div>
          </div>
        </header>

        <div className="p-4 md:p-6">
          <section className="grid gap-3 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-rose-100 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-rose-950/60">{stat.label}</p>
                  <stat.icon className="size-4 text-rose-500" />
                </div>
                <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </section>

          <section className="mt-4 rounded-lg border border-rose-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-rose-100 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <activeConfig.icon className="size-5 text-rose-600" />
                  <h1 className="text-xl font-semibold">{activeConfig.title}</h1>
                  <Badge className="bg-rose-600 text-white">{filteredRows.length} 条</Badge>
                </div>
                <p className="mt-1 text-sm text-rose-950/55">{activeConfig.description}</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-rose-400" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="h-9 w-full border-rose-200 pl-9 sm:w-72"
                    placeholder="按名称、专业、城市筛选..."
                  />
                </div>
                <Button className="bg-rose-600 text-white hover:bg-rose-700" onClick={saveCurrent} disabled={loading}>
                  <Plus />
                  {editingId ? '保存修改' : `添加${activeConfig.title}`}
                </Button>
              </div>
            </div>

            <div className="border-b border-rose-100 px-4 py-3">
              <Tabs value={activeKey} onValueChange={(value) => setActiveKey(value as EntityKey)}>
                <TabsList className="bg-rose-50">
                  {configs.map((config) => (
                    <TabsTrigger key={config.key} value={config.key}>
                      {config.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="grid min-h-[560px] lg:grid-cols-[1fr_360px]">
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-rose-50/60 hover:bg-rose-50/60">
                      <TableHead className="w-10">
                        <span className="block size-4 rounded-full border border-rose-200" />
                      </TableHead>
                      {activeConfig.columns.map((column) => (
                        <TableHead key={column.key} style={{ width: column.width }}>
                          <span className="inline-flex items-center gap-1">
                            {column.label}
                            <ChevronDown className="size-3 text-rose-300" />
                          </span>
                        </TableHead>
                      ))}
                      <TableHead className="w-28 text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRows.map((row) => (
                      <TableRow key={String(row[activeConfig.idKey])}>
                        <TableCell>
                          <span className="block size-4 rounded-full border border-rose-200" />
                        </TableCell>
                        {activeConfig.columns.map((column) => (
                          <TableCell key={column.key} className="max-w-[340px] overflow-hidden text-ellipsis">
                            <CellValue row={row} column={column} activeKey={activeKey} />
                          </TableCell>
                        ))}
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon-sm" onClick={() => editRow(row)}>
                              <Settings2 />
                            </Button>
                            <Button variant="ghost" size="icon-sm" onClick={() => deleteRow(row)}>
                              <Trash2 className="text-rose-600" />
                            </Button>
                            <Button variant="ghost" size="icon-sm">
                              <MoreHorizontal />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredRows.length === 0 ? (
                  <div className="flex h-48 items-center justify-center text-sm text-rose-950/50">暂无匹配数据</div>
                ) : null}
              </div>

              <aside className="border-t border-rose-100 bg-[#fffafa] p-4 lg:border-l lg:border-t-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold">{editingId ? '编辑记录' : '新增记录'}</h2>
                    <p className="mt-1 text-xs text-rose-950/50">字段对应数据库实体类属性</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetForm}>
                    重置
                  </Button>
                </div>
                <Separator className="my-4 bg-rose-100" />
                <div className="space-y-3">
                  {activeConfig.fields.map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <Label className="text-xs text-rose-950/70">{field.label}</Label>
                      {field.type === 'textarea' ? (
                        <Textarea
                          value={String(forms[activeKey][field.key] ?? '')}
                          onChange={(event) => updateForm(field, event.target.value)}
                          placeholder={field.placeholder}
                          className="min-h-20 resize-none border-rose-200 bg-white"
                        />
                      ) : (
                        <Input
                          value={String(forms[activeKey][field.key] ?? '')}
                          type={field.type === 'number' ? 'number' : 'text'}
                          onChange={(event) => updateForm(field, event.target.value)}
                          placeholder={field.placeholder}
                          className="border-rose-200 bg-white"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full bg-rose-600 text-white hover:bg-rose-700" onClick={saveCurrent} disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : <Plus />}
                  {editingId ? '保存当前记录' : '提交新增记录'}
                </Button>
                <p className="mt-3 rounded-lg border border-rose-100 bg-white p-3 text-xs leading-5 text-rose-950/60">{notice}</p>
              </aside>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

function NavGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="px-2 text-xs text-rose-900/50">{title}</p>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  )
}

function NavButton({
  active,
  children,
  icon: Icon,
  onClick,
}: {
  active: boolean
  children: ReactNode
  icon: typeof Building2
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-9 w-full items-center gap-2 rounded-lg px-2 text-left text-sm transition ${
        active ? 'bg-rose-100 text-rose-950' : 'text-rose-950/75 hover:bg-rose-50'
      }`}
    >
      <Icon className="size-4" />
      {children}
    </button>
  )
}

function CellValue({ row, column, activeKey }: { row: EntityRecord; column: ColumnConfig; activeKey: EntityKey }) {
  const value = row[column.key]
  if (activeKey === 'companies' && column.key === 'companyName') {
    return (
      <div className="flex items-center gap-2">
        <div className="size-8 overflow-hidden rounded-lg bg-rose-50">
          {row.companyImage ? <img src={String(row.companyImage)} alt="" className="size-full object-cover" /> : null}
        </div>
        <span className="font-medium">{displayValue(value)}</span>
      </div>
    )
  }
  if (column.key === 'salaryMin' || column.key === 'salaryMax') {
    return <Badge variant="outline" className="border-rose-200 text-rose-700">￥{displayValue(value)}</Badge>
  }
  if (column.key === 'resumeUrl') {
    return (
      <a className="text-rose-600 underline-offset-4 hover:underline" href={String(value)} target="_blank" rel="noreferrer">
        {displayValue(value)}
      </a>
    )
  }
  if (column.key === 'companyNature' || column.key === 'major') {
    return <Badge className="bg-rose-50 text-rose-700 hover:bg-rose-50">{displayValue(value)}</Badge>
  }
  return <span>{displayValue(value)}</span>
}
