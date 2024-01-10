import path from 'path'
import { copySync } from 'fs-extra'
import { green, yellow } from 'colors'
import prompt, { type Answers } from 'prompts'

import { type QuestionResponses } from './types'
import { exec } from 'child_process'
import questions from './lib/questions'

const currentDirectory = process.cwd()

/**
 * The initialization of the app to create the express api
 * @async
 * @author ConanGH-S
 */
export async function init (): Promise<void> {
  const { userProjectName, projectLang, projectType, installDependencies } = await setProjectOptions() as QuestionResponses
  const projectName = parseProjectName(userProjectName)
  const projectPath = path.join(currentDirectory, projectName)
  const template = path.join(__dirname, `/templates/${projectType}-${projectLang}/`)
  cloneTemplate(template, projectPath)
  if (installDependencies) await installPackageDependencies(projectPath)
  console.info(green('Run: ') + yellow(`cd ${projectName}`))
  if (!installDependencies) console.info(green('Run: ') + yellow('npm install') + green(' to install dependencies'))
  console.info(green('Run: ') + yellow('npm start or npm start:dev') + green(' to initializate the app'))
}
void init()

/**
 * Async function to ask project options to build the expected project
 * @returns {string}
 * @example
 * const name = await setProjectOptions()
 * @author ConanGH-S
 */
export async function setProjectOptions (): Promise<Answers<any>> {
  const response = await prompt(questions)
  return response
}

/**
 * Parse the name of the application with "-"
 * @param {string} name
 * @returns {string}
 * @example
 * const parsed = parseProjectName('My App')
 * console.log(parsed) // my-app
 * @author ConanGH-S
 */
export function parseProjectName (name: string): string {
  const searchSpaces = name.includes(' ')
  if (searchSpaces) console.warn(yellow('! Warning: ') + 'Your spaces will be trimmed and converted to "-"')
  const projectName = name.trim().replace(/ /g, '-')
  return projectName
}

/**
 * Clone a directory using ./templates into the user directory
 * @param {string} template
 * @param {string} copyTo
 * @returns {void}
 * @example
 * copySync('src/templates/express-js/', '/tmp/my-backend-app')
 * @author ConanGH-S
 */
function cloneTemplate (template: string, copyTo: string): void {
  try {
    copySync(template, copyTo)
  } catch (error) {
    console.error('Oh no!', error)
  }
}

async function installPackageDependencies (projectPath: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    try {
      let dotCount = 0
      const intervalId = setInterval(() => {
        process.stdout.clearLine(1)
        process.stdout.cursorTo(0)
        process.stdout.write('Installing dependencies' + '.'.repeat(dotCount++))
        if (dotCount > 3) dotCount = 0
      }, 500)

      exec(`cd ${projectPath} && npm install`, (stdout) => {
        clearInterval(intervalId)
        console.log(stdout)
        resolve()
      })
    } catch (error) {
      console.error(error)
    }
  })
}
