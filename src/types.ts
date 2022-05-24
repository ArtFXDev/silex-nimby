export interface NimbyStatusPost {
  auto: boolean
}

export interface NimbyStatus {
  value: boolean
  mode: string
  usage: ComputerUsage
  logged: boolean,
}

export interface ComputerUsage {
  type: string
  details?: string
}
