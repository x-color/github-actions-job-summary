import * as core from '@actions/core'
import * as yaml from 'js-yaml'
import {promises as fs} from 'fs'

const format = (template: string, vars: Map<string, string>): string => {
  let result = template
  for (const [k, v] of vars.entries()) {
    result = result.replace(`{${k}}`, v)
  }

  return result
}

async function run(): Promise<void> {
  try {
    const mdFile = core.getInput('file')
    const vars = yaml.load(core.getInput('vars')) as Map<string, string>
    // eslint-disable-next-line no-console
    console.log(vars)
    const md = await fs.readFile(mdFile)
    await core.summary.addRaw(format(md.toString(), vars)).write()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
