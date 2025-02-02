import {Material} from 'cannon-es'

export interface ObstacleMaterial {
  angleIron: Material
  rail: Material
}

export interface SkateboardMaterial {
  slide: Material
  grind: Material
}

export interface Materials {
  obstacle: ObstacleMaterial
  skateboard: SkateboardMaterial
}
