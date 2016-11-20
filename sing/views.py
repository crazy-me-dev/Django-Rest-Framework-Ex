from django.shortcuts import render
from django.contrib import auth
# Create your views here.
from sing.forms import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt 

from django.contrib.auth.models import User
from rest_framework import viewsets
from sing.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer



def login(request):
    creators = User.objects.all()
    c = {
        "creators":creators
    }
    return render_to_response('login.html',c)

@csrf_exempt
def auth_view(request):

    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    user = auth.authenticate(username = username, password=password )

    if user is not None:
        auth.login(request, user)
        user_name = request.user.username
        request.session['user_id'] = request.user.id
        # profilepic = UserProfile.objects.filter(user_id = request.user.id)
        return render_to_response('success.html', {"user":user_name})
    else:
        return HttpResponseRedirect('/register')


@csrf_protect
def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = User.objects.create_user(
            username=form.cleaned_data['username'],
            password=form.cleaned_data['password1'],
            email=form.cleaned_data['email']
            )
            return HttpResponseRedirect('/register/success/')
    else:
        form = RegistrationForm()
    variables = RequestContext(request, {'form': form})
 
    return render_to_response('register.html',variables)
 
def register_success(request):
    return render_to_response('success2.html')
 
def logout_page(request):
    logout(request)
    return HttpResponseRedirect('/login')
 
@login_required
def home(request):
    return render_to_response('home.html',{ 'user': request.user })