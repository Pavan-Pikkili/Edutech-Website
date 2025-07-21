from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('home/', views.home, name='home'),
    path('signup_user/', views.signup_user, name='signup_user'),
    path('login_user/', views.login_user, name='login_user'),
    
     
]
