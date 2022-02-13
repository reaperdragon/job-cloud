import { UnAuthenticatedError } from "../error/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  // if (requestUser.role === 'admin') return
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnAuthenticatedError(
    "Not authorized to access this route"
  );
};

export default checkPermissions;
