import * as DARK from './dark';
import * as DARK_COLORS from './dark/colors';
import * as LIGHT from './light';
import * as LIGHT_COLORS from './light/colors';
import * as COMMON from './common';

const theme = 'light';
const wireframe = false; // 线框风格
const IS_LIGHT = theme === 'light';

// // 亮色主题token
const Light_Token = { ...LIGHT, ...COMMON, wireframe };
// // 暗色主题token
const Dark_Token = { ...DARK, ...COMMON, wireframe };

export const token = IS_LIGHT ? Light_Token : Dark_Token;

export const colors = IS_LIGHT ? LIGHT_COLORS : DARK_COLORS;

export const staticToken = { ...LIGHT, ...COMMON, wireframe };
