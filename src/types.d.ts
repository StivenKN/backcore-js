export type QuestionKeys = 'userProjectName' | 'projectType' | 'projectLang' | 'installDependencies'

export interface QuestionResponses {
  userProjectName: string
  projectType: string
  projectLang: string
  installDependencies: boolean
}
