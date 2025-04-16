import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loginSchema, type LoginFormData } from '../schemas/login.schema'
import { useAuth } from '../contexts/useAuth'
import { useState } from 'react'

export default function Login() {
  const navigate = useNavigate()
  const { setToken, setUserEmail } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      setError('')
      const response = await axios.post('https://reqres.in/api/login', data)
      setToken(response.data.token)
      setUserEmail(data.email)
      navigate('/users')
    } catch {
      setError('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-xl">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-bounce"
            >
              {/* Hair */}
              <path
                d="M10 30C10 20 20 8 30 8C40 8 50 20 50 30"
                fill="#8B4513"
              />
              {/* Face */}
              <circle cx="30" cy="28" r="18" fill="#FFE5D9"/>
              {/* Eyes */}
              <ellipse cx="24" cy="26" rx="2.5" ry="3.5" fill="#000000"/>
              <ellipse cx="36" cy="26" rx="2.5" ry="3.5" fill="#000000"/>
              {/* Blush */}
              <circle cx="20" cy="32" r="3" fill="#FFB7B7" opacity="0.6"/>
              <circle cx="40" cy="32" r="3" fill="#FFB7B7" opacity="0.6"/>
              {/* Smile */}
              <path
                d="M26 34C28 36 32 36 34 34"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Body/Dress */}
              <path
                d="M15 40C15 52 45 52 45 40"
                fill="#FF69B4"
              />
              {/* Bow */}
              <path
                d="M26 12C26 12 30 10 34 12C30 14 26 12 26 12Z"
                fill="#FF69B4"
              />
              <circle cx="30" cy="12" r="2" fill="#FF69B4"/>
            </svg>
            <h1 className="text-3xl font-bold text-indigo-600">
              Your Given Assignment is Ready Senpai!
            </h1>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                {...register('email')}
                type="email"
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white/50 backdrop-blur-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white/50 backdrop-blur-sm"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
