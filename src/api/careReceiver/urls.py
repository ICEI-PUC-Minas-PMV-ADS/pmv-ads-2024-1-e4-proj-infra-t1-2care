from django.urls import path
from .views import (
    CareReceiverCreateView,
    CareReceiverDetailView,
    SpecialCareDetailView,
    SpecialCareListView,
    SpecialCareUserDetailView,
    SpecialCareUserListView,
)

urlpatterns = [
    # CareReceiver App -> Rotas relacionadas a aqueles que receberão os Cuidados
    path("carereceiver/", CareReceiverCreateView.as_view(), name="carereceiver-create"),
    #path(
    #    "carereceiver/<uuid:pk>",
    #    CareReceiverDetailView.as_view(),
    #    name="carereceiver-detail",
    #),
    path("special-care/", SpecialCareListView.as_view(), name="special-care-list"),
    path(
        "special-care/<uuid:pk>/",
        SpecialCareDetailView.as_view(),
        name="special-care-detail",
    ),
    path(
        "special-care-user/",
        SpecialCareUserListView.as_view(),
        name="special-care-user-list",
    ),
    path(
        "special-care-user/<uuid:pk>/",
        SpecialCareUserDetailView.as_view(),
        name="special-care-user-detail",
    ),
]
