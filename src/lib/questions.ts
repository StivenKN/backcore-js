import { existsSync } from 'fs'
import { type PromptObject } from 'prompts'

export default [
  {
    name: 'userProjectName',
    message: 'Aplication name: ',
    type: 'text',
    initial: 'my-backend-app',
    format: (value: string) => value.toLowerCase(),
    validate: (value: string) => {
      if (existsSync(value)) return 'This folder already exists'
      if (value.trim().length === 0) return 'Your name must not be empty'
      return true
    }
  },
  {
    name: 'projectType',
    message: 'Project framework: ',
    type: 'select',
    choices: [
      {
        title: 'Express',
        value: 'express',
        selected: true
      },
      {
        title: 'Other frameworks soon...',
        value: 'wip',
        disabled: true
      }]
  },
  {
    name: 'projectLang',
    message: 'Project language: ',
    type: 'select',
    choices: [
      {
        title: 'JavaScript ',
        value: 'js',
        selected: true
      },
      {
        title: 'TypeScript - WIP',
        value: 'ts',
        disabled: true
      }]
  },
  {
    name: 'installDependencies',
    message: 'Do you want to install dependencies?',
    type: 'confirm'
  }
] satisfies PromptObject[]
