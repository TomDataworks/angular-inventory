from rest_framework import permissions

class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return view.action == 'retrieve' or request.user.is_staff
