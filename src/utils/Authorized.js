import { Authorized } from 'components';
import { getAuthority } from './authority';

let RenderAuthorized = Authorized(getAuthority());

// Reload the rights component
const reloadAuthorized = () => {
  RenderAuthorized = Authorized(getAuthority());
};

export { reloadAuthorized };
export default RenderAuthorized;
