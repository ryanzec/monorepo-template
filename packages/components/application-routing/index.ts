import ApplicationRouting from '$/components/application-routing/application-routing';
import AuthenticatedRoute from '$/components/application-routing/authenticated-route';
import AuthenticatedRoutePure from '$/components/application-routing/authenticated-route-pure';
import UnauthenticatedRoute from '$/components/application-routing/unauthenticated-route';
import UnauthenticatedRoutePure from '$/components/application-routing/unauthenticated-route-pure';

export default Object.assign(ApplicationRouting, {
  AuthenticatedRoute,
  AuthenticatedRoutePure,
  UnauthenticatedRoute,
  UnauthenticatedRoutePure,
});
