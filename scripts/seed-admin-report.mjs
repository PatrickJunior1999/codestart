import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

function loadEnvSeed() {
  const envPath = path.resolve(process.cwd(), '.env.seed')

  if (!fs.existsSync(envPath)) {
    return
  }

  const content = fs.readFileSync(envPath, 'utf8')

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue

    const separatorIndex = line.indexOf('=')
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

loadEnvSeed()

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Erro: configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no arquivo .env.seed')
  console.error('Exemplo: copie .env.seed.example para .env.seed e preencha a service role key do Supabase.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const PASSWORD = 'Teste123!'
const TEST_EMAIL_DOMAIN = '@codestart.test'

const students = [
  // 18 alunos concluintes
  { fullName: 'Ana Clara Souza', email: 'ana.clara@codestart.test', school: 'Escola Estadual São José', classGroup: '2º Ano A', completedModules: 8, finalScore: 95, hasProject: true, hasCertificate: true },
  { fullName: 'Lucas Henrique Silva', email: 'lucas.silva@codestart.test', school: 'Escola Estadual São José', classGroup: '2º Ano A', completedModules: 8, finalScore: 88, hasProject: true, hasCertificate: true },
  { fullName: 'Mariana Costa Lima', email: 'mari.lima@codestart.test', school: 'Escola Estadual São José', classGroup: '2º Ano B', completedModules: 8, finalScore: 92, hasProject: true, hasCertificate: true },
  { fullName: 'João Pedro Almeida', email: 'joao.pedro@codestart.test', school: 'Escola Municipal Rui Barbosa', classGroup: '1º Ano A', completedModules: 8, finalScore: 84, hasProject: true, hasCertificate: true },
  { fullName: 'Beatriz Oliveira Martins', email: 'bia.martins@codestart.test', school: 'Escola Municipal Rui Barbosa', classGroup: '1º Ano A', completedModules: 8, finalScore: 100, hasProject: true, hasCertificate: true },
  { fullName: 'Gabriel Santos Rocha', email: 'gabriel.rocha@codestart.test', school: 'Escola Municipal Rui Barbosa', classGroup: '1º Ano B', completedModules: 8, finalScore: 90, hasProject: true, hasCertificate: true },
  { fullName: 'Larissa Fernandes Melo', email: 'lari.melo@codestart.test', school: 'IFMT - Turma Experimental', classGroup: 'Grupo 1', completedModules: 8, finalScore: 86, hasProject: true, hasCertificate: true },
  { fullName: 'Rafael Gomes Pereira', email: 'rafa.gomes@codestart.test', school: 'IFMT - Turma Experimental', classGroup: 'Grupo 1', completedModules: 8, finalScore: 78, hasProject: true, hasCertificate: true },
  { fullName: 'Camila Ribeiro Nunes', email: 'camila.nunes@codestart.test', school: 'IFMT - Turma Experimental', classGroup: 'Grupo 2', completedModules: 8, finalScore: 94, hasProject: true, hasCertificate: true },
  { fullName: 'Matheus Vinícius Barros', email: 'matheus.barros@codestart.test', school: 'Projeto CodeStart', classGroup: 'Turma Piloto', completedModules: 8, finalScore: 82, hasProject: true, hasCertificate: true },
  { fullName: 'Isabela Cristina Moreira', email: 'isa.moreira@codestart.test', school: 'Projeto CodeStart', classGroup: 'Turma Piloto', completedModules: 8, finalScore: 96, hasProject: true, hasCertificate: true },
  { fullName: 'Pedro Augusto Cardoso', email: 'pedro.cardoso@codestart.test', school: 'Projeto CodeStart', classGroup: 'Turma Piloto', completedModules: 8, finalScore: 80, hasProject: true, hasCertificate: true },
  { fullName: 'Sofia Helena Duarte', email: 'sofia.duarte@codestart.test', school: 'Escola Estadual São José', classGroup: '2º Ano C', completedModules: 8, finalScore: 98, hasProject: true, hasCertificate: true },
  { fullName: 'Gustavo Ferreira Lopes', email: 'guto.lopes@codestart.test', school: 'Escola Estadual São José', classGroup: '2º Ano C', completedModules: 8, finalScore: 76, hasProject: true, hasCertificate: true },
  { fullName: 'Amanda Vitória Castro', email: 'amanda.castro@codestart.test', school: 'Escola Municipal Rui Barbosa', classGroup: '1º Ano C', completedModules: 8, finalScore: 91, hasProject: true, hasCertificate: true },
  { fullName: 'Daniel Marques Teixeira', email: 'daniel.teixeira@codestart.test', school: 'Escola Municipal Rui Barbosa', classGroup: '1º Ano C', completedModules: 8, finalScore: 87, hasProject: true, hasCertificate: true },
  { fullName: 'Vitória Azevedo Ramos', email: 'vivi.ramos@codestart.test', school: 'IFMT - Turma Experimental', classGroup: 'Grupo 2', completedModules: 8, finalScore: 93, hasProject: true, hasCertificate: true },
  { fullName: 'Felipe Eduardo Moura', email: 'felipe.moura@codestart.test', school: 'Projeto CodeStart', classGroup: 'Turma Piloto', completedModules: 8, finalScore: 85, hasProject: true, hasCertificate: true },

  // 16 alunos em diferentes estágios
  { fullName: 'Letícia Barbosa Reis', email: 'leticia.reis@codestart.test', school: 'Escola Estadual São José', classGroup: '2º Ano A', completedModules: 7, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Bruno Cavalcante Dias', email: 'bruno.dias@codestart.test', school: 'Escola Estadual São José', classGroup: '2º Ano B', completedModules: 7, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Eduarda Caroline Freitas', email: 'duda.freitas@codestart.test', school: 'Escola Municipal Rui Barbosa', classGroup: '1º Ano A', completedModules: 6, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Thiago Martins Araújo', email: 'thiago.araujo@codestart.test', school: 'Escola Municipal Rui Barbosa', classGroup: '1º Ano B', completedModules: 6, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Nicole Pereira Campos', email: 'nick.campos@codestart.test', school: 'IFMT - Turma Experimental', classGroup: 'Grupo 1', completedModules: 5, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Caio Henrique Batista', email: 'caio.batista@codestart.test', school: 'IFMT - Turma Experimental', classGroup: 'Grupo 1', completedModules: 5, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Yasmin Rodrigues Tavares', email: 'yasmin.tavares@codestart.test', school: 'Projeto CodeStart', classGroup: 'Turma Piloto', completedModules: 4, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Murilo Andrade Sales', email: 'murilo.sales@codestart.test', school: 'Projeto CodeStart', classGroup: 'Turma Piloto', completedModules: 4, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Laura Mendes Carvalho', email: 'laura.carvalho@codestart.test', school: 'Escola Estadual São José', classGroup: '2º Ano C', completedModules: 3, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Enzo Gabriel Pires', email: 'enzo.pires@codestart.test', school: 'Escola Estadual São José', classGroup: '2º Ano C', completedModules: 3, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Heloísa Martins Cunha', email: 'helo.martins@codestart.test', school: 'Escola Municipal Rui Barbosa', classGroup: '1º Ano C', completedModules: 2, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Arthur Nascimento Lima', email: 'arthur.lima@codestart.test', school: 'Escola Municipal Rui Barbosa', classGroup: '1º Ano C', completedModules: 2, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Maria Eduarda Alves', email: 'madu.alves@codestart.test', school: 'IFMT - Turma Experimental', classGroup: 'Grupo 2', completedModules: 1, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Samuel Rocha Vieira', email: 'samuel.vieira@codestart.test', school: 'IFMT - Turma Experimental', classGroup: 'Grupo 2', completedModules: 1, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Clara Beatriz Monteiro', email: 'clara.monteiro@codestart.test', school: 'Projeto CodeStart', classGroup: 'Turma Piloto', completedModules: 0, finalScore: 0, hasProject: false, hasCertificate: false },
  { fullName: 'Miguel Fernandes Brito', email: 'miguel.brito@codestart.test', school: 'Projeto CodeStart', classGroup: 'Turma Piloto', completedModules: 0, finalScore: 0, hasProject: false, hasCertificate: false }
]

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getAllTestUsers() {
  const testUsers = []
  let page = 1
  const perPage = 1000

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage })
    if (error) throw error

    const users = data?.users ?? []
    testUsers.push(...users.filter((user) => user.email?.endsWith(TEST_EMAIL_DOMAIN)))

    if (users.length < perPage) break
    page += 1
  }

  return testUsers
}

async function cleanupPreviousSeed() {
  console.log('Limpando massa fictícia anterior...')

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, email')
    .like('email', `%${TEST_EMAIL_DOMAIN}`)

  if (profilesError) throw profilesError

  const userIds = (profiles ?? []).map((profile) => profile.id)

  if (userIds.length > 0) {
    const userIdTables = [
      'certificates',
      'final_assessment_attempts',
      'final_projects',
      'quiz_attempts',
      'activity_attempts',
      'progress'
    ]

    for (const table of userIdTables) {
      const { error } = await supabase.from(table).delete().in('user_id', userIds)
      if (error) {
        console.warn(`Aviso: não foi possível limpar ${table}: ${error.message}`)
      }
    }

    const { error: profileDeleteError } = await supabase.from('profiles').delete().in('id', userIds)
    if (profileDeleteError) {
      console.warn(`Aviso: não foi possível limpar profiles: ${profileDeleteError.message}`)
    }
  }

  const authUsers = await getAllTestUsers()

  for (const user of authUsers) {
    const { error } = await supabase.auth.admin.deleteUser(user.id)
    if (error) {
      console.warn(`Aviso: não foi possível excluir usuário ${user.email}: ${error.message}`)
    }
    await sleep(80)
  }

  console.log(`Limpeza concluída. Usuários removidos: ${authUsers.length}`)
}

async function fetchCourseData() {
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('id, order_index, title, xp_reward')
    .order('order_index')

  if (modulesError) throw modulesError
  if (!modules || modules.length === 0) {
    throw new Error('Nenhum módulo encontrado. Execute as migrations/seed do curso antes de rodar este script.')
  }

  const { data: activities, error: activitiesError } = await supabase
    .from('activities')
    .select('id, module_id, title')

  if (activitiesError) throw activitiesError

  const { data: quizQuestions, error: quizQuestionsError } = await supabase
    .from('quiz_questions')
    .select('id, module_id')

  if (quizQuestionsError) throw quizQuestionsError

  const quizTotals = new Map()

  for (const question of quizQuestions ?? []) {
    quizTotals.set(question.module_id, (quizTotals.get(question.module_id) ?? 0) + 1)
  }

  return {
    modules,
    activities: activities ?? [],
    quizTotals
  }
}

function getScoreForModule(studentIndex, moduleIndex) {
  const scoreSteps = [75, 80, 85, 90, 95, 100]
  return scoreSteps[(studentIndex + moduleIndex) % scoreSteps.length]
}

function getDateDaysAgo(daysAgo) {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString()
}

async function createStudent(student, studentIndex, courseData) {
  const { fullName, email, school, classGroup, completedModules, finalScore, hasProject, hasCertificate } = student

  console.log(`${String(studentIndex + 1).padStart(2, '0')}/34 - Criando ${fullName} (${email})`)

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      school,
      class_group: classGroup,
      lgpd_consent: true
    }
  })

  if (createError) {
    throw new Error(`Erro ao criar usuário ${email}: ${createError.message}`)
  }

  const userId = created.user.id
  const createdAt = getDateDaysAgo(40 - studentIndex)

  const { error: profileError } = await supabase.from('profiles').upsert({
    id: userId,
    full_name: fullName,
    email,
    school,
    class_group: classGroup,
    role: 'student',
    lgpd_consent: true,
    lgpd_consent_at: createdAt,
    created_at: createdAt,
    updated_at: new Date().toISOString()
  }, { onConflict: 'id' })

  if (profileError) throw profileError

  const completed = courseData.modules.filter((module) => module.order_index <= completedModules)

  for (const module of completed) {
    const moduleScore = getScoreForModule(studentIndex, module.order_index)
    const completedAt = getDateDaysAgo(Math.max(1, 35 - studentIndex - module.order_index))

    const { error: progressError } = await supabase.from('progress').upsert({
      user_id: userId,
      module_id: module.id,
      status: 'completed',
      score: moduleScore,
      xp_earned: module.xp_reward,
      started_at: createdAt,
      completed_at: completedAt,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,module_id' })

    if (progressError) throw progressError

    const moduleActivities = courseData.activities.filter((activity) => activity.module_id === module.id)

    for (const activity of moduleActivities) {
      const { error: activityError } = await supabase.from('activity_attempts').upsert({
        user_id: userId,
        activity_id: activity.id,
        submitted_data: {
          seed: true,
          activity_title: activity.title,
          message: 'Tentativa fictícia para teste do painel administrativo'
        },
        is_correct: true,
        completed_at: completedAt
      }, { onConflict: 'user_id,activity_id' })

      if (activityError) throw activityError
    }

    const totalQuestions = courseData.quizTotals.get(module.id) ?? 5
    const correctAnswers = Math.max(1, Math.min(totalQuestions, Math.round(totalQuestions * (moduleScore / 100))))

    const { error: quizError } = await supabase.from('quiz_attempts').insert({
      user_id: userId,
      module_id: module.id,
      score: moduleScore,
      total_questions: totalQuestions,
      correct_answers: correctAnswers,
      answers: {
        seed: true,
        simulated_answers: true
      },
      completed_at: completedAt
    })

    if (quizError) throw quizError
  }

  if (completedModules < 8) {
    const currentModule = courseData.modules.find((module) => module.order_index === completedModules + 1)

    if (currentModule) {
      const { error: inProgressError } = await supabase.from('progress').upsert({
        user_id: userId,
        module_id: currentModule.id,
        status: 'in_progress',
        score: null,
        xp_earned: 0,
        started_at: getDateDaysAgo(Math.max(1, 20 - studentIndex)),
        completed_at: null,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,module_id' })

      if (inProgressError) throw inProgressError
    }
  }

  if (hasProject) {
    const { error: projectError } = await supabase.from('final_projects').upsert({
      user_id: userId,
      project_title: `Cena programada - ${fullName}`,
      project_code: `cor azul
retangulo 80 180 180 120
cor vermelho
triangulo 70 180 170 90 270 180
cor amarelo
circulo 330 80 40
cor verde
retangulo 360 220 40 100
circulo 380 190 50
linha 40 310 440 310`,
      project_preview: null,
      status: 'submitted',
      submitted_at: getDateDaysAgo(2),
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' })

    if (projectError) throw projectError
  }

  if (finalScore > 0) {
    const { error: finalAssessmentError } = await supabase.from('final_assessment_attempts').insert({
      user_id: userId,
      score: finalScore,
      total_questions: 10,
      correct_answers: Math.max(0, Math.min(10, Math.round(finalScore / 10))),
      answers: {
        seed: true,
        simulated_answers: true
      },
      completed_at: getDateDaysAgo(1)
    })

    if (finalAssessmentError) throw finalAssessmentError
  }

  if (hasCertificate) {
    const code = `CS-2026-DEMO-${String(studentIndex + 1).padStart(2, '0')}`

    const { error: certificateError } = await supabase.from('certificates').upsert({
      user_id: userId,
      certificate_code: code,
      course_name: 'CodeStart: Explorando o Mundo da Programação',
      workload_hours: 4,
      issued_at: new Date().toISOString(),
      validation_hash: `seed-${Buffer.from(email).toString('base64url')}`,
      status: 'valid'
    }, { onConflict: 'user_id' })

    if (certificateError) throw certificateError
  }

  await sleep(150)
}

async function printSummary() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .like('email', `%${TEST_EMAIL_DOMAIN}`)

  if (error) throw error

  const fakeStudents = data ?? []
  const userIds = fakeStudents.map((student) => student.id)

  const { data: progress } = userIds.length > 0
    ? await supabase.from('progress').select('user_id, status').in('user_id', userIds)
    : { data: [] }

  const { data: certificates } = userIds.length > 0
    ? await supabase.from('certificates').select('user_id').in('user_id', userIds)
    : { data: [] }

  const completedByUser = new Map()
  for (const row of progress ?? []) {
    if (row.status === 'completed') {
      completedByUser.set(row.user_id, (completedByUser.get(row.user_id) ?? 0) + 1)
    }
  }

  const concludedCount = [...completedByUser.values()].filter((count) => count >= 8).length

  console.log('\nResumo da massa de teste:')
  console.log(`- Alunos fictícios cadastrados: ${fakeStudents.length}`)
  console.log(`- Alunos com 8 módulos concluídos: ${concludedCount}`)
  console.log(`- Certificados emitidos: ${(certificates ?? []).length}`)
  console.log(`- Senha padrão das contas: ${PASSWORD}`)
  console.log('\nAcesse o painel administrativo e atualize a página para visualizar os dados.')
}

async function main() {
  console.log('CodeStart - Seed do painel administrativo')
  console.log('-------------------------------------------')
  console.log('Esta rotina usa a Service Role Key localmente. Nunca envie .env.seed ao GitHub.')

  await cleanupPreviousSeed()
  const courseData = await fetchCourseData()

  for (let index = 0; index < students.length; index += 1) {
    await createStudent(students[index], index, courseData)
  }

  await printSummary()
}

main().catch((error) => {
  console.error('\nFalha ao criar massa de teste:')
  console.error(error)
  process.exit(1)
})
