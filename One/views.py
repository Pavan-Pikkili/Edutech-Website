from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .db import reg_collection  # ✅ Make sure this matches the variable name in db.py

def signup(request):
    return render(request, 'signup.html')

@csrf_exempt  # If CSRF is not handled in your fetch request
def signup_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        if not username or not password or not email:
            return JsonResponse({'success': False, 'message': 'All fields are required.'})
        
        #checking for the email
        if reg_collection.find_one({'email': email}):
           return JsonResponse({'success': False, 'message': 'Email already registered.'})
        # Check if username exists in MongoDB
        if reg_collection.find_one({'username': username}):
            return JsonResponse({'success': False, 'message': 'Username already exists.'})

        # Insert user into MongoDB
        reg_collection.insert_one({
            'username': username,
            'password': password,
            'email': email
        })

        return JsonResponse({'success': True, 'message': 'User registered successfully.'})

    return JsonResponse({'success': False, 'message': 'Invalid request method.'})


@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        if not username or not password:
            return JsonResponse({'success': False, 'message': 'All fields are required.'})

        user = reg_collection.find_one({'username': username})

        if not user:
            return JsonResponse({'success': False, 'message': 'Username does not exist.'})

        if user['password'] != password:
            return JsonResponse({'success': False, 'message': 'Incorrect password.'})

        return JsonResponse({'success': True, 'message': 'Login successful.'})

    return JsonResponse({'success': False, 'message': 'Invalid request method.'})\
        
        
        
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        if not username or not password:
            return JsonResponse({'success': False, 'message': 'All fields are required.'})

        user = reg_collection.find_one({'username': username})

        if not user:
            return JsonResponse({'success': False, 'message': 'Username does not exist.'})

        if user['password'] != password:
            return JsonResponse({'success': False, 'message': 'Incorrect password.'})

        return JsonResponse({'success': True, 'message': 'Login successful.'})

    return JsonResponse({'success': False, 'message': 'Invalid request method.'})
      


def login(request):
    return render(request, 'login.html')



def home(request):
    return render(request, 'home.html')
