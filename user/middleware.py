from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from re import sub


EXCLUDE_LIST = [
	'/user/register',
	'/user/login',
	'add_record/',
	'admin',
]

def authentication_middleware(get_response):
	"""
	USAGE
	-----
	Pass Key 'Authorisation' and value of 'token-string'
	"""

	def middleware(request):
		""" middleware function for user authentication"""
		print('Token: ',request.META.get('HTTP_AUTHORIZATION'),'xxx')
		
		if request.path.startswith('/admin/'):
			return get_response(request)

		if request.META['PATH_INFO'] not in EXCLUDE_LIST:
			
			if not request.META.get('HTTP_AUTHORIZATION'):
				return Response("Token is missing",
					status = status.HTTP_400_BAD_REQUEST
				)
			
			try:
				token = sub('Token ', '', request.META.get(
					'HTTP_AUTHORIZATION', 'xxx'))
			except:
				return Response("This token was recieved:", token)

			token_obj = Token.objects.filter(key=token).first()

			if not token_obj:
				return Response(
					{"detail": "Token is invalid"},
					status=status.HTTP_401_UNAUTHORIZED)
		
			request.healthy_user = token_obj.user
		return get_response(request)

	return middleware
